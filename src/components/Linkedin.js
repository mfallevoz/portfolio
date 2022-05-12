import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Linkedin = () => {
  return (
    <a
      className="card"
      href="https://www.linkedin.com/in/mfallevoz/"
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <FaLinkedin />
      </div>
      <h3>LinkedIn</h3>
    </a>
  );
};

export default Linkedin;
