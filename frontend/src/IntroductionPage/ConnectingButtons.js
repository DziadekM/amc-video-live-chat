/*Button Komponente erstellen. Je nachdem welcher Button geklickt wird, werden unterschiedliche
Events ausgelöst. Entweder wird der User zur Seite Join-Room weitergeleitet oder auf die Host-Seite*/

import React from "react";
import ConnectingButton from "./ConnectingButton";
import { useNavigate } from "react-router-dom";

const ConnectingButtons = () => {
  let navigate = useNavigate();
  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true");
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        buttonText="Host a meeting"
        createRoomButton
        onClickHandler={pushToJoinRoomPageAsHost}
      />
    </div>
  );
};

export default ConnectingButtons;
