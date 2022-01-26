import React from "react";
import { useState, useEffect } from "react";
//import * as C from "../Map.styles.js";
import _ from "lodash";
import store from "../../store/store";

import { useCharacter } from "../../hooks/useCharacter";
import { Character } from "../../components/Character/index";
import WorldMap from "../WorldSection/WorldMap";
import WorldAvatars from "./WorldAvatars";

const WorldSection = () => {
  const [state, setState] = useState("noAvatar");
  //const myState = store.getState().identity;
  //const identityLoggedIn = JSON.stringify(myState);

  const char = useCharacter("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownChar2);
  }, []);

  const handleKeyDownChar2 = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        char.moveLeft();
        break;
      case "ArrowUp":
        char.moveTop();
        break;
      case "ArrowRight":
        char.moveRight();
        break;
      case "ArrowDown":
        char.moveDown();
        break;
    }
  };



  return (
    <div className="chat_section_container"> 
      <WorldMap />
      <WorldAvatars />
    </div>
  );
};

export default WorldSection;
