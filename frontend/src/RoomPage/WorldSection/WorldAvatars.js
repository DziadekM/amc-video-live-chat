import React from "react";
import { connect } from "react-redux";
import { useCharacter } from "../../hooks/useCharacter";
import { Character } from "../../components/Character/index";
import { useState, useEffect } from "react";
import store from "../../store/store";
import io from "socket.io-client";

const SingleParticipant = (props) => {
  const { identity, lastItem, participant, thisChar, index } = props;
  const playerName = props.identity;
  const char = useCharacter(playerName);
  const socket = io.connect("https://localhost:5000");
  const [state, setState] = useState({ index: thisChar, name: playerName });

  useEffect(() => {
    if (thisChar === index) {
      console.log("Test");
      window.addEventListener("keydown", handleKeyDownChar);
    }
    socket.on("keydown", (data) => {
      HandleKeyDownCharFromSocket(data);
    });
  }, []);

  const HandleKeyDownCharFromSocket = (data) => {
    if (data.playerName === playerName && data.index !== characterIndex) {
      console.log("Empfangen", data);
      switch (data.key) {
        case "KeyA":
          char.moveLeft();
          break;
        case "KeyW":
          char.moveTop();
          break;
        case "KeyD":
          char.moveRight();
          break;
        case "KeyS":
          char.moveDown();
          break;
      }
    }
  };
  const handleKeyDownChar = (e) => {
    switch (e.code) {
      case "KeyA":
        char.moveLeft();
        break;
      case "KeyW":
        char.moveTop();
        break;
      case "KeyD":
        char.moveRight();
        break;
      case "KeyS":
        char.moveDown();
        break;
    }
    console.error(playerName, e.code);
    let key = e.code;
    socket.emit("keydown", { playerName, key, index });
  };

  return (
    <>
      <Character x={char.x} y={char.y} side={char.side} name={char.name} />
    </>
  );
};
let characterIndex = -1;
const WorldAvatars = ({ participants }) => {
  console.log(participants);
  return (
    <div>
      {participants.map((participant, index) => {
        if (participants.length === index + 1 && characterIndex === -1) {
          characterIndex = index;
          console.log(characterIndex);
        }
        return (
          <SingleParticipant
            key={participant.identity}
            lastItem={participants.length === index + 1}
            participant={participant}
            thisChar={characterIndex}
            index={index}
            identity={participant.identity}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(WorldAvatars);
