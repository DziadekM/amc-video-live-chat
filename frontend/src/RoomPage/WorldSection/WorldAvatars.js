import React from "react";
import { connect } from "react-redux";
import { useCharacter } from "../../hooks/useCharacter";
import { Character } from "../../components/Character/index";
import { useState, useEffect } from "react";

const SingleParticipant = (props) => {
  const { identity, lastItem, participant } = props;
  const char = useCharacter(identity);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownChar);
  }, []);

  const handleKeyDownChar = (e) => {
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
    <>
      <Character x={char.x} y={char.y} side={char.side} name={char.name} />
    </>
  );
};

const WorldAvatars = ({ participants }) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.identity}
            //lastItem={participants.length === index + 1}
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
