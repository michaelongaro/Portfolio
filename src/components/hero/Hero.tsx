import { useState, type KeyboardEvent } from "react";
import openInNewTab from "../../util/openInNewTab";

import mediumGithubLogo from "../../assets/mediumGithubLogo.png";

import classes from "./Hero.module.css";
import "../../index.css";

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
    <h2 className={`${classes.heroBackground} baseVertFlex`}>
      <div className={`${classes.hero} baseVertFlex`}>
        <div className={classes.topHero}>
          Hi, I'm <span className={classes.nameUnderline}>Michael</span>
        </div>
        <div className={`${classes.middleHero} baseFlex`}>
          I'm a<div className={classes.leftBracket}>&lt;</div>
          <div className={classes.webDevText}>full stack web developer</div>
          <div className={classes.rightBracket}>/&gt;</div>
        </div>

        <div
          className={classes.logoContainer}
          tabIndex={6}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onFocus={handleInteractionStart}
          onBlur={handleInteractionEnd}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <img
            src={mediumGithubLogo}
            alt={"Github Logo"}
            className={`${classes.githubLogo} ${classes.bottomHero}`}
          />

          <svg
            style={{ opacity: hoveringOnGithubLogo ? 0.85 : 0 }}
            className={classes.waves}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={classes.parallax}>
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(5,32,74,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(5,32,74,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(5,32,74,0.3)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="rgba(5,32,74, 0.1)"
              />
            </g>
          </svg>
        </div>
      </div>
    </h2>
  );
}

export default Hero;
