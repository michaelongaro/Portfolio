import { useState, type KeyboardEvent } from "react";
import openInNewTab from "../../util/openInNewTab";
import mediumGithubLogo from "../../assets/mediumGithubLogo.png";

function Hero() {
  const [hoveringOnGithubLogo, setHoveringOnGithubLogo] = useState(false);

  function handleInteractionStart() {
    setHoveringOnGithubLogo(true);
  }

  function handleInteractionEnd() {
    setHoveringOnGithubLogo(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      openInNewTab("https://github.com/michaelongaro");
    }
  }

  function handleClick() {
    openInNewTab("https://github.com/michaelongaro");
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center py-20">
      <div className="space-y-6 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Michael</span>
        </h1>
        
        <div className="text-xl md:text-3xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <span>I'm a</span>
          <span className="font-mono text-blue-600 dark:text-blue-400">&lt;</span>
          <span className="font-semibold">full stack web developer</span>
          <span className="font-mono text-blue-600 dark:text-blue-400">/&gt;</span>
        </div>

        <div
          className="relative mt-12 cursor-pointer group inline-block"
          tabIndex={0}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onFocus={handleInteractionStart}
          onBlur={handleInteractionEnd}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <div className={`absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${hoveringOnGithubLogo ? 'opacity-40' : ''}`}></div>
          <img
            src={mediumGithubLogo}
            alt="Github Logo"
            className="relative w-24 h-24 md:w-32 md:h-32 transition-transform duration-300 transform group-hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
