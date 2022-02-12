import React from "react";
import ParticipantsLabel from "./ParticipantsLabel";
import Participants from "./Participants";
import ChatSection from "../ChatSection/ChatSection";

const ParticipantsSection = () => {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
      <ChatSection />
    </div>
  );
};

export default ParticipantsSection;
