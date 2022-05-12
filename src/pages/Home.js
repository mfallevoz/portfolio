import React from "react";
import Navigation from "../components/Navigation";
import me from "../assets/img/me.jpeg";
import PersonalInfo from "../components/PersonalInfo";
import JSCard from "../components/JSCard";
import DesignCard from "../components/DesignCard";
import PHPCard from "../components/PHPCard";
import OthersCard from "../components/OthersCard";

const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>Home</h1>
        <div className="introduction">
          <div className="text">
            <PersonalInfo />
          </div>
          <div className="border">
            <img src={me} alt="Smiling me" />
          </div>
        </div>

        <h1>Skills</h1>
        <div className="skills">
          <JSCard />
          <DesignCard />
          <PHPCard />
          <OthersCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
