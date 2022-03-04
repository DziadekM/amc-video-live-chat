import styled from "styled-components";

const chars = ['/assets/char.png', '/assets/spiderman_neu.png', '/assets/mario.png', '/assets/peach.png', '/assets/biest.png', '/assets/belle.png', '/assets/gaston.png','/assets/harry.png', '/assets/draco.png', '/assets/hermine.png', '/assets/ron.png', '/assets/luigi.png', '/assets/pumpkin.png', '/assets/kiki.png'];
const index = Math.floor(Math.random() * 14);
console.log(index);
export const Container = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  background-image: url("${chars[index]}");
  background-position: 0px ${(props) => props.sidePosicao}px;
`;
export const NameBox = styled.div`
  background-color: #fff;
  padding: 3px;
  border-radius: 5px;
  position: absolute;
  font-size: 10px;
  text-align: center;
  margin-top: -20px;
  color: #000;
`;
