//Styles from the Map & Container

import styled from "styled-components";

export const Container = styled.div`
  background-color: #24282f;
  min-height: 100vh;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
`;

export const Map = styled.div`
  height: 480px;
  width: 480px;
  background-image: url("/assets/map.png");
  background-position: left top;
  background-size: contain;
  position: relative;
  margin-bottom: 130px;
`;
