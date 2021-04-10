import { useEffect, useState } from "react";
import { masterchef } from "../instances/initMasterchef";
import { Staking } from "../types";
import { isValidAddress } from "../utils";

export const useWardenStaking = (address: string) => {
  const [staking, setStaking] = useState<Staking[] | []>([]);

  useEffect(() => {
    const fetchStaking = async () => {
      if (isValidAddress(address)) {
        const poolInfos = await masterchef.getPoolInfos();
        const _staking = await masterchef.getStaking(poolInfos, address);
        setStaking(_staking);
      } else {
        console.log("Invalid address");
      }
    };

    fetchStaking();
  }, [address]);

  return staking;
};
