import React from "react";
import styled from "styled-components";
import TopHead from "./TopHead";
import HotCollection from "./HotCollection";
import LatestDrops from "./LatestDrops";

const Wrapper = styled.div`
  padding: 40px 0px 80px 0px;
  max-width: 1364px;
  width: 90%;
  margin: 0 auto;
`

const Landing = () => {
  return (
    <Wrapper>
      <TopHead />
      <HotCollection />
      <LatestDrops />
    </Wrapper>
  );
}

export default Landing;