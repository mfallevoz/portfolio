import React from "react";
import DesignIcon from "../assets/img/design.png";

const DesignCard = () => {
  return (
    <div className="skill">
      <div>
        <img src={DesignIcon} alt="HTML CSS icons" />
      </div>
      <h3 className="title">WebDesign</h3>
      <div>
        <p>HTML5</p>
        <p>CSS3</p>
      </div>
    </div>
  );
};

export default DesignCard;
