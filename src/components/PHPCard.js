import React from "react";
import PHPIcon from "../assets/img/php.png";

const PHPCard = () => {
  return (
    <div className="skill">
      <div className="link">
        <img src={PHPIcon} alt="PHP icon" />
      </div>
      <h3 className="title">PHP</h3>
      <div>
        <p>MySQL</p>
        <p>Laravel</p>
      </div>
    </div>
  );
};

export default PHPCard;
