import React, { useEffect } from "react";
import logo from "../resources/images/logo-hs-fulda.png";
import ConnectingButtons from "./ConnectingButtons";
import { connect } from "react-redux";
import "./IntroductionPage.css";
import { setIsRoomHost } from "../store/actions";

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  });

  return (
    <div>
      <h6>
        Only for Demonstration: A Project from the University of Applied Science
        in Fulda
      </h6>
      <h1>DIY Gather Town</h1>
      <div className="introduction_page_container">
        <div className="introduction_page_panel">
          <img
            className="introduction_page_image"
            src={logo}
            alt="Logo der Hochschule Fulda"
          ></img>

          <img
            className="introduction_page_picture"
            alt="Platzhalter-Bild"
            src="https://cdn.pixabay.com/photo/2016/11/30/02/35/sky-1871753_1280.png"
          ></img>

          <ConnectingButtons />
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapActionsToProps)(IntroductionPage);
