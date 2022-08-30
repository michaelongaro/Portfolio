import { useState } from "react";

import { MainNavigation } from "./components/header/MainNavigation";
import { Hero } from "./components/hero/Hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <MainNavigation />
      <Hero />
    </div>
  );
}

export default App;
