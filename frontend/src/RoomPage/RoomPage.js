import React, { useState, useEffect } from "react";
import WorldSection from "./WorldSection/WorldSection";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import RoomLabel from "./RoomLabel";
import * as webRTCHandler from "../utils/webRTCHandler";
import { connect } from "react-redux";

import "./RoomPage.css";
import Overlay from "./Overlay";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio
      );
    }
  }, []);

  return (
    <div>
      <h6>
        Only for Demonstration: A Project from the University of Applied Science
        in Fulda
      </h6>
      <h1>DIY Gather Town</h1>
      <div className="room_container">
        <ParticipantsSection />

        <WorldSection />
        <VideoSection />
        <RoomLabel roomId={roomId} />
        {showOverlay && <Overlay />}
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
