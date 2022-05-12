import React from "react";
import ProgrammingIcon from "../assets/img/programming.png";

const OthersCard = () => {
  return (
    <div className="skill">
      <div className="link">
        <img src={ProgrammingIcon} alt="Programming icon" />
      </div>
      <h3 className="title">And more...</h3>
      <div>
        <p>Git</p>
        <p>Bash</p>
        <p>C# (Unity)</p>
      </div>
    </div>
  );
};

export default OthersCard;
