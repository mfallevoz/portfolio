import React from "react";
import { FaGithubSquare } from "react-icons/fa";

const Github = () => {
  return (
    <a
      className="card"
      href="https://github.com/mfallevoz"
      target="_blank"
      rel="noreferrer"
    >
      <div className="link">
        <FaGithubSquare />
      </div>
      <h3 className="link">Github</h3>
    </a>
  );
};

export default Github;
