import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import store from "../../store/store";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

//prod
//const socket = io.connect("https://amc-gathertown.informatik.hs-fulda.de:5000");

//dev
const socket = io.connect("https://localhost:5000");

const Messages = ({ name, message }) => {
  const [chat, setChat] = useState([]);
  const namePlayer = store.getState().identity;
  const [state, setState] = useState({ message: "", name: namePlayer });

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <p className="sender_name">{name}:</p>
        <p className="message_text">{message}</p>
      </div>
    ));
  };

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  return (
    <div className="messaging_container">
      <div className="messages_container">
        <div className="render-chat">{renderChat()}</div>
      </div>
      <div className="new_message_container">
        <input
          className="new_message_input"
          value={state.message}
          name="message"
          placeholder="Type your message ..."
          type="text"
          onChange={(e) => onTextChange(e)}
        />

        <IconButton
          style={{ color: "#06d6a0" }}
          aria-label="upload picture"
          component="span"
          onClick={onMessageSubmit}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Messages);
