import _, { isEmpty } from "lodash";
import { Contract } from "web3-eth-contract";
import { getTokenData } from "../constants/coingecko";
import { PoolInfo, Staking, TokenBalance } from "../types";
import { toDecimal } from "../utils";
import { TokenHelper } from "./tokenHelper";

export class Masterchef {
  constructor(
    private readonly masterchef: Contract,
    private readonly helper: TokenHelper
  ) {}

  getPoolInfos = async () => {
    const {
      rewardAddress,
      rewardDecimals,
      rewardLogo,
      rewardSymbol,
    } = await this.getRewardInfo();
    const poolLength = parseInt(
      await this.masterchef.methods.poolLength().call()
    );
    const poolIds = _.range(poolLength);
    const poolInfos = await Promise.all<any>(
      poolIds.map(async (pid: number) => {
        const pool = await this.masterchef.methods.poolInfo(pid).call();

        const lpAddress = pool.lpToken.toLowerCase();
        const tokenDecimals =
          (await this.helper.getTokenDecimals(lpAddress)) || null;

        try {
          const pair = await this.helper.getTokenPair(lpAddress);
          const poolInfo = {
            poolId: pid,
            lpAddress,
            tokenDecimals,
            token0Address: pair.token0Address,
            token0Symbol: pair.token0Symbol,
            token0Decimals: pair.token0Decimals,
            token0Logo: getTokenData(pair.token0Address)?.logo,
            token1Address: pair.token1Address,
            token1Symbol: pair.token1Symbol,
            token1Decimals: pair.token1Decimals,
            token1Logo: getTokenData(pair.token1Address)?.logo,
            rewardAddress,
            rewardDecimals,
            rewardSymbol,
            rewardLogo,
            type: "lp",
          };
          return poolInfo;
        } catch {
          const tokenSymbol = await this.helper.getTokenSymbol(lpAddress);
          const poolInfo = {
            poolId: pid,
            tokenAddress: lpAddress,
            tokenSymbol,
            tokenDecimals,
            tokenLogo: getTokenData(lpAddress)?.logo,
            rewardAddress,
            rewardDecimals,
            rewardSymbol,
            rewardLogo,
            type: "single",
          };
          return poolInfo;
        }
      })
    );

    console.log("Getting pool info : ", poolInfos);
    return poolInfos.filter((poolInfo) => !isEmpty(poolInfo));
  };

  async getStaking(poolInfos: PoolInfo[], address: string) {
    let stakingBalance: (PoolInfo & TokenBalance)[] = await Promise.all(
      poolInfos.map(async (poolInfo) => {
        const balance = await this.getStakingBalance(poolInfo, address);
        return { ...poolInfo, ...balance };
      })
    );

    stakingBalance = stakingBalance.filter(
      (staking) => staking.tokenBalance > 0
    );

    const position: Staking[] = await Promise.all(
      stakingBalance.map(async (staking) => {
        const reward = await this.getStakingReward(staking, address);
        const rewardPrice = await this.helper.getRewardPrice(staking);
        if (staking.type === "lp") {
          const underlying = await this.helper.getLPUnderlyingBalance(staking);
          const price = await this.helper.getLPStakingPrice(staking);
          return {
            ...staking,
            ...reward,
            ...rewardPrice,
            ...underlying,
            ...price,
          };
        }
        const price = await this.helper.getSingleStakingPrice(staking);
        return { ...staking, ...reward, ...rewardPrice, ...price };
      })
    );

    return position;
  }

  async getStakingBalance(poolInfo: PoolInfo, address: string) {
    const user = await this.masterchef.methods
      .userInfo(poolInfo.poolId, address)
      .call();

    return {
      tokenBalance: toDecimal(user.amount, poolInfo.tokenDecimals).toNumber(),
    };
  }

  async getStakingReward(poolInfo: PoolInfo, address: string) {
    const pendingReward = await this.masterchef.methods
      .pendingWarden(poolInfo.poolId, address)
      .call();

    return {
      rewardBalance: toDecimal(
        pendingReward,
        poolInfo.rewardDecimals
      ).toNumber(),
    };
  }

  async getRewardInfo() {
    const rewardAddress = (
      await this.masterchef.methods.warden().call()
    ).toLowerCase();
    const rewardSymbol = await this.helper.getTokenSymbol(rewardAddress);
    const rewardDecimals = await this.helper.getTokenDecimals(rewardAddress);
    const rewardLogo = getTokenData(rewardAddress)?.logo;

    return {
      rewardAddress,
      rewardSymbol,
      rewardDecimals,
      rewardLogo,
    };
  }
}
