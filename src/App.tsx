import Navbar from "./components/header/Navbar";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import AboutMe from "./components/aboutme/AboutMe";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import {
  ExplorationProvider,
  useExploration,
} from "./context/ExplorationContext";
import { useEffect } from "react";

function AppContent() {
  const { isExploring } = useExploration();

  useEffect(() => {
    if (isExploring) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehaviorY = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.overscrollBehaviorY = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehaviorY = "";
    };
  }, [isExploring]);

  return (
    <div className="App min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {!isExploring && <Navbar />}
      <Hero />
      <main className="container relative mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-16">
        <Skills />
        <Projects />
        <AboutMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ExplorationProvider>
        <AppContent />
      </ExplorationProvider>
    </ThemeProvider>
  );
}

export default App;
