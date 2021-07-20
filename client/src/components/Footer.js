import React from "react";
import netflixLogo from "../images/cineTrailer.png";
import { useHistory } from "react-router-dom";
import "./Footer.css";
function Footer() {
  const history = useHistory();
  return (
    <div className="footer">
      <img
        className="footerBrand__logo"
        src={netflixLogo}
        alt="netflix-logo"
        onClick={() => {
          history.push("/");
        }}
      />
      <p>
        <small></small>
        @2021 || <span className="github__link">Source Code</span>
      </p>
    </div>
  );
}

export default Footer;
