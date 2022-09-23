import MainNavigation from "./components/header/MainNavigation";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import AboutMe from "./components/aboutme/AboutMe";
import Contact from "./components/contact/Contact";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Footer from "./components/footer/footer";

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
      <Footer />
    </div>
  );
}

export default App;
