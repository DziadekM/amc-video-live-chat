import React, { useState } from "react";

import SendMessageButton from "../../resources/images/sendMessageButton.svg";

const NewMessage = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        name="msg"
        placeholder="Type your message ..."
        type="text"
      />
      <img className="new_message_button" src={SendMessageButton} />
    </div>
  );
};

export default NewMessage;
