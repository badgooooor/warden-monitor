import { useState } from "react";
import { Button, TextInput } from "../core/Form";
import { ComponentContainer } from "../core/Wrapper";

type AddressInputProps = {
  handleSubmit: (address: string) => void
}

export function AddressInput({ handleSubmit }: AddressInputProps) {
  const [address, setAddress] = useState("");

  return (
    <ComponentContainer>
      <TextInput
        value={address}
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      />
      <Button
        style={{
          marginLeft: '1em'
        }}
        onClick={() => {
          handleSubmit(address);
        }}
      >Go!</Button>
    </ComponentContainer>
  );
}