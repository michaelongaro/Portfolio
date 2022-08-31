import { useState } from "react";

import { MainNavigation } from "./components/header/MainNavigation";
import { Hero } from "./components/hero/Hero";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";
import { AboutMe } from "./components/aboutme/AboutMe";

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <Hero />
      <Skills />
      <Projects />
      <AboutMe />
    </div>
  );
}

export default App;
