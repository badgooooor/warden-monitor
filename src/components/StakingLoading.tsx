import { StakingContainer } from "../core/Wrapper";
import { isValidAddress } from "../utils";

type StakingLoadingProps = {
  address: string
}

export function StakingLoading({ address }: StakingLoadingProps) {
  return (
    <StakingContainer
      style={{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center'
      }}
    >
      {
        isValidAddress(address) ? <h4>🔍 Loading positions . . . </h4> : <h4>❌ Invalid address</h4>
      }
    </StakingContainer>
  )
}