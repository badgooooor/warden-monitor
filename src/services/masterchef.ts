import _ from "lodash";
import { Contract } from "web3-eth-contract";
import { TokenHelper } from "./tokenHelper";

export class Masterchef {
  constructor(
    private readonly masterchef: Contract,
    private readonly helper: TokenHelper
  ) {}

  getPoolInfos = async () => {
    const poolLength = parseInt(
      await this.masterchef.methods.poolLength().call()
    );
    const poolIds = _.range(poolLength);
    const poolInfos = await Promise.all<any>(
      poolIds.map(async (pid: number) => {
        const pool = await this.masterchef.methods.poolInfo(pid).call();
        return pool;
      })
    );
    console.log(poolInfos);
  };
}
