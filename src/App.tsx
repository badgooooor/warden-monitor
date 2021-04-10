import React, { useState } from 'react';
import { AddressInput } from './components/AddressInput';
import { useWardenStaking } from './hooks/useWardenStaking';

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
    </div>
  );
}

export default App;
