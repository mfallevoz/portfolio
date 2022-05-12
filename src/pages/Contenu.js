import React, { useContext } from "react";
import "../styles/pages/Contenu.css";
import { ThemeContext } from "../contexts/ThemeContext";

const Contenu = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <h1>Lorem ipsum dolor sit amet.</h1>
    </div>
  );
};

export default Contenu;
