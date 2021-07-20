import React from "react";
import GridLoader from "react-spinners/GridLoader";
import "./Loader.css";
function Loader() {
  return (
    <div className="loader">
      <GridLoader size={20} margin={5} color={"#4ca1af"} />
    </div>
  );
}

export default Loader;
