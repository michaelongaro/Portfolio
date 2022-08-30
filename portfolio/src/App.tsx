import { useState } from "react";

import { MainNavigation } from "./components/header/MainNavigation";
import { Hero } from "./components/hero/Hero";
import { Skills } from "./components/skills/Skills";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <MainNavigation />
      <Hero />
      <Skills />
    </div>
  );
}

export default App;
