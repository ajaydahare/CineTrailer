import React, { useEffect, useState } from "react";
import "./Header.css";

import netflixLogo from "../images/cineTrailer.png";
import { Link, useHistory } from "react-router-dom";
import UserIcon from "../images/nfuser.jpg";
function Header({ user }) {
  const history = useHistory();

  const [navbarBg, setNavbarBg] = useState(false);

  const setNavbar = () => {
    if (window.scrollY > 50) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setNavbar);
    return () => {
      window.removeEventListener("scroll", setNavbar);
    };
  }, []);
  return (
    <div className={`app__header ${navbarBg && "app__headerBg"}`}>
      <ul className="appHeader__main">
        <li className="app__logo">
          <img
            className="brand__logo"
            src={netflixLogo}
            alt="netflix-logo"
            onClick={() => {
              history.push("/");
            }}
          />
        </li>
      </ul>

      <div className="app__user">
        <img src={user?.photoURL || UserIcon} alt="" />

        <span>
          <Link to="/login">
            {user?.result?.name || user?.result?.email || "Login"}
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
