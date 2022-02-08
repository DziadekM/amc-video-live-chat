import React from "react";
import { connect } from "react-redux";
import { useCharacter } from "../../hooks/useCharacter";
import { Character } from "../../components/Character/index";
import { useState, useEffect } from "react";
import store from "../../store/store";

const SingleParticipant = (props) => {
  const { identity, lastItem, participant } = props;
  const playerName = props.identity;
  const char = useCharacter(playerName);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownChar);
  }, []);

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
  };

  return (
    <>
      <Character x={char.x} y={char.y} side={char.side} name={char.name} />
    </>
  );
};

const WorldAvatars = ({ participants }) => {
  return (
    <div>
      {participants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.identity}
            lastItem={participants.length === index + 1}
            participant={participant}
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
