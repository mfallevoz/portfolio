import React from "react";
import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>About</h1>
        <br />
        <a className="about">
          <p>
            Hello, I'm Melchior, I'm a 23 years old programming student in
            Epitech Lyon, France. I've always dreamed to become a freelance
            programmer and I'm now working to make that dream come true.
          </p>
          <p>
            Like most of my colleagues, that dream started when I was a kid,
            playing on his GameBoy. Right after being graduated, I decided to
            join ISART Digital, a private school based in Paris, France,
            specialized on cinema and, of course, video games.
          </p>
          <p>
            As a sign of recognition, I wanted to go from playing video game, to
            program and design video game. I quickly realized that my
            expectation wasn't as good as it would be. I've been tempted to be
            and UI/UX Designer so I quit Paris to focus on myself and my new
            goals and then move to Lyon in Epitech.
          </p>
          <br />
          <p>
            Freshly arrived at Lyon, I'm now learning Web development in
            Epitech. I started to learn JavaScript and I'm now learning
            React.js. I took that opportunity to create this website. I want it
            to be a place where I could share all my school projects as a way to
            learn some more by explaining them to others.
          </p>
        </a>
      </div>
    </div>
  );
};

export default About;
