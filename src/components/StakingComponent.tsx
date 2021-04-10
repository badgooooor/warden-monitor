import styled from "@emotion/styled";
import { StakingContainer } from "../core/Wrapper";
import { Staking } from "../types";

type StakingComponentProps = {
  staking: Staking
}

const PoolHeading = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  font-size: 1em;
  font-weight: 700;
`

const PoolLogoWrapper = styled.div`
  padding-right: 0.5em;
`

const PoolDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  font-size: 1em;
`

const PoolDetailHeading = styled.div`
  font-size: 0.8em;
`


export function StakingComponent({ staking }: StakingComponentProps) {
  function getPoolName() {
    if (staking.type === "single") {
      return staking.tokenSymbol;
    } else if (staking.type === "lp") {
      return staking.token0Symbol + "/" + staking.token1Symbol;
    }
  }

  function PoolLogo() {
    const width = 20
    if (staking.type === "single") {
      return <PoolLogoWrapper>
        <img src={staking.tokenLogo} width={width} alt={staking.tokenSymbol} />
      </PoolLogoWrapper>
    } else if (staking.type === "lp") {
      return <PoolLogoWrapper>
        <img src={staking.token0Logo} width={width} alt={staking.token0Symbol} />
        <img src={staking.token1Logo} width={width} alt={staking.token1Logo} />
      </PoolLogoWrapper>
    } else {
      return <></>
    }
  }

  return (
    <StakingContainer
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <PoolHeading>
        <PoolLogo />
        <span>{getPoolName()}</span>
      </PoolHeading>
      <PoolDetail>
        <PoolDetailHeading>Staking Balance</PoolDetailHeading>
        <div>{staking.tokenBalance.toFixed(5)}</div>
        {
          staking.type === "lp" &&
          <PoolDetailHeading>
            ({staking.token0Balance.toFixed(2)} {staking.token0Symbol} + {staking.token1Balance.toFixed(2)} {staking.token1Symbol})
          </PoolDetailHeading>
        }
      </PoolDetail>
      <PoolDetail>
        <PoolDetailHeading>Reward</PoolDetailHeading>
        <div>{staking.rewardBalance.toFixed(5)} {staking.rewardSymbol}</div>
      </PoolDetail>
    </StakingContainer>
  );
}