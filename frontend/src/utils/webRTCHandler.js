import { setShowOverlay } from "../store/actions";
import store from "../store/store";
import * as wss from "./wss";
import Peer from "simple-peer";

const defaultConstraints = {
  audio: true,
  //set the resolution
  video: {
    width: "480",
    height: "360",
  },
};

//if user connects only with Audio
const onlyAudioConstraints = {
  audio: true,
  video: false,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null,
  onlyAudio
) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("successfuly received local stream");
      localStream = stream;
      showLocalVideoPreview(localStream);

      // dispatch an action to hide overlay
      store.dispatch(setShowOverlay(false));

      isRoomHost
        ? wss.createNewRoom(identity, onlyAudio)
        : wss.joinRoom(identity, roomId, onlyAudio);
    })
    .catch((err) => {
      console.log(
        "error occurred when trying to get an access to local stream"
      );
      console.log(err);
    });
};

let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    // webRTC offer, webRTC Answer (SDP informations), ice candidates

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  //add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

//if user leaves the room, remove the peer Connection, because its not necessary
export const removePeerConnection = (data) => {
  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl.srcObject.getTracks();

    tracks.forEach((t) => t.stop());

    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);

    videoContainer.parentNode.removeChild(videoContainer);

    //close the peer-connection for the socketId, if user is disconnected
    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);

  if (store.getState().connectOnlyWithAudio) {
    videoContainer.appendChild(getAudioOnlyLabel());
  }

  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
  //display incoming stream
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  //zoom in to the incoming Streams/video area (full-screen)
  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElement);
  //check if other user connected only with audio
  const participants = store.getState().participants;
  const participant = participants.find((p) => p.socketId === connUserSocketId);

  if (participant?.onlyAudio) {
    videoContainer.appendChild(getAudioOnlyLabel());
  }

  videosContainer.appendChild(videoContainer);
};

//if user is only connected with audio show a default pic
const getAudioOnlyLabel = () => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label_only_audio_container");

  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
  label.innerHTML = "Only audio ";

  labelContainer.appendChild(label);
  return labelContainer;
};

/////////////////////END UI////////////////////////////////////

////////////////////Buttons Logic/////////////////////////////

export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};
