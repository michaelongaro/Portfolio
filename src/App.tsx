import { MainNavigation } from "./components/header/MainNavigation";
import { Hero } from "./components/hero/Hero";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";
import { AboutMe } from "./components/aboutme/AboutMe";
import { Contact } from "./components/contact/Contact";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <Hero />
      <Skills />
      <Projects />
      <AboutMe />
      <Contact />
      <ScrollToTop />
    </div>
  );
}

export default App;
