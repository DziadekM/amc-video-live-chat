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
  return (
    <div className="chat_section_container">
      <WorldMap />
      <WorldAvatars />
    </div>
  );
};

export default WorldSection;
