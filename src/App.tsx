import React, { useState } from 'react';
import { AddressInput } from './components/AddressInput';
import { StakingComponent } from './components/StakingComponent';
import { HeadingContainer, PageContainer } from './core/Wrapper';
import { useWardenStaking } from './hooks/useWardenStaking';
import { Staking } from './types';

function App() {
  const [address, setAddress] = useState("");
  const wardenStaking = useWardenStaking(address);
  console.log(address, wardenStaking);

  return (
    <PageContainer>
      <HeadingContainer>
        <h1>📡👽 Warden Watch</h1>
      </HeadingContainer>
      <AddressInput
        handleSubmit={(_address) => setAddress(_address)}
      />
      {
        wardenStaking.map((staking: Staking) => (
          <StakingComponent staking={staking} />
        ))
      }
    </PageContainer>
  );
}

export default App;
