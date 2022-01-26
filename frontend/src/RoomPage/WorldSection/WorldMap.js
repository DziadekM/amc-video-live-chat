import React from "react";
import * as C from "../Map.styles.js";
import store from "../../store/store";
import WorldAvatars from "./WorldAvatars.js";

const SingleAvatar = (props) => {
  const myState = store.getState().identity;
  const identityLoggedIn = JSON.stringify(myState);

  const { identity, lastItem, participant } = props;
  console.log(identity);
  return (
    <>
      <p className="participants_paragraph">Hier {JSON.stringify(myState)}</p>
    </>
  );
};

const WorldMap = ({ participants }) => {
  return (
    <div className="chat_section_container">
      <C.Map>
        <WorldAvatars />
      </C.Map>
    </div>
  );
};

export default WorldMap;
