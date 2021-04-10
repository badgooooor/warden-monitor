import styled from "@emotion/styled";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: start;
  padding-left: 2em;
`;

export const ComponentContainer = styled.div`
  width: 90%;
  padding: 1em;
  margin-bottom: 1em;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const StakingContainer = styled.div`
  width: 90%;
  padding: 1em;
  margin-bottom: 1em;
  background: rgba(19, 18, 52, 0);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
