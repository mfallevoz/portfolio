import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("waw");

  return (
    <ThemeContext.Provider value={{ theme }}>
      {props.childen}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
