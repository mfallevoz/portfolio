import React from "react";
import JSIcon from "../assets/img/javascript.png";

const JSCard = () => {
  return (
    <div className="skill">
      <div>
        <img src={JSIcon} alt="JavaScript icon" />
      </div>
      <h3 className="title">JavaScript</h3>
      <div>
        <p>ReactJS</p>
        <p>NodeJS</p>
        <p>JQuery</p>
      </div>
    </div>
  );
};

export default JSCard;
