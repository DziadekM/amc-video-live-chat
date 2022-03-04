import * as C from "./styles";
//import { CharacterSides } from "../../types/CharacterSides";
import React from "react";

export const Character = ({ x, y, side, name }) => {
  var _a;
  const size = 30;
  const sides = {
    down: 0,
    left: -30,
    right: -60,
    up: -90,
  };
  return React.createElement(
    C.Container,
    {
      size: size,
      left: x * size,
      top: y * size,
      sidePosicao: (_a = sides[side]) !== null && _a !== void 0 ? _a : 0,
    },
    React.createElement(C.NameBox, null, name)
  );
};
