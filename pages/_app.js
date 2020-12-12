import "../styles/globals.css";

import styled from "styled-components";

const Container = styled.div`
  background-color: #f7f6e7;
`;

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
