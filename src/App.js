import React, { useState } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Timeline from "./components/Timeline";
import Experience from "./components/Experience";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { StarsCanvas } from "./components/StarBackground";
import "./App.css";
import "./styles/Global.css";

function App() {
  const [showStars, setShowStars] = useState(true);
  return (
    <div className="App">
      {showStars && <StarsCanvas />}
        <>
          <NavBar showStars={showStars} setShowStars={setShowStars} />
          <SideNavBar showStars={showStars} setShowStars={setShowStars} />
        </>
      
      <div id="content">
        <Intro />
        <About />
        <Projects />
        <Timeline />
        <Experience />
        <TechStack />
        <Contact />
        <Credits />
      </div>
    </div>
  );
}

export default App;