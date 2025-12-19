import Navbar from "./components/header/Navbar";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import AboutMe from "./components/aboutme/AboutMe";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <Navbar />
        <Hero />
        <main className="container relative mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-16">
          <Skills />
          <Projects />
          <AboutMe />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
