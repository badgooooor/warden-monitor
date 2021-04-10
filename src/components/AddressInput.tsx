import React, { useState } from "react";

type AddressInputProps = {
  handleSubmit: (address: string) => void
}

export function AddressInput({ handleSubmit }: AddressInputProps) {
  const [address, setAddress] = useState("");

  return (
    <div>
      <input
        value={address}
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      />
      <button
        onClick={() => {
          handleSubmit(address);
        }}
      >Profile</button>
    </div>
  );
}