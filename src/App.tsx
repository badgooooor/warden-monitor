import React, { useState } from 'react';
import { AddressInput } from './components/AddressInput';
import { StakingComponent } from './components/StakingComponent';
import { useWardenStaking } from './hooks/useWardenStaking';
import { Staking } from './types';

function App() {
  const [address, setAddress] = useState("");
  const wardenStaking = useWardenStaking(address);
  console.log(address, wardenStaking);

  return (
    <div>
      <h1>Warden Profiler</h1>
      <AddressInput
        handleSubmit={(_address) => setAddress(_address)}
      />
      {
        wardenStaking.map((staking: Staking) => (
          <StakingComponent staking={staking} />
        ))
      }
    </div>
  );
}

export default App;
