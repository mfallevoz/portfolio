import React from "react";
import Github from "../components/Github";
import Linkedin from "../components/Linkedin";
import Navigation from "../components/Navigation";

const Contact = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>Contact</h1>
        <h2>My Socials</h2>
        <div className="socials">
          <Github />
          <Linkedin />
        </div>
      </div>
    </div>
  );
};

export default Contact;
