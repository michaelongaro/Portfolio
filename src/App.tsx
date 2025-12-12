import Navbar from "./components/header/Navbar";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import AboutMe from "./components/aboutme/AboutMe";
import Contact from "./components/contact/Contact";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <Hero />
          <Skills />
          <Projects />
          <AboutMe />
          <Contact />
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
