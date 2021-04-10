import React from "react";
import { Staking } from "../types";

type StakingComponentProps = {
  staking: Staking
}

export function StakingComponent({ staking }: StakingComponentProps) {
  function getPoolName() {
    if (staking.type === "single") {
      return staking.tokenSymbol;
    } else if (staking.type === "lp") {
      return staking.token0Symbol + "/" + staking.token1Symbol;
    }
  }

  return (
    <div>
      <h2>{getPoolName()}</h2>
      <div>Token Balance : {staking.tokenBalance}</div>
      <div>Reward : {staking.rewardBalance} {staking.rewardSymbol}</div>
    </div>
  );
}