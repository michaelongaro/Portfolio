import openInNewTab from "../../util/openInNewTab";

import mediumGithubLogo from "../../assets/mediumGithubLogo.png";

import classes from "./Hero.module.css";
import "../../index.css";

function Hero(props: any) {
  return (
    <div className={`${classes.heroBackground} baseFlex`}>
      <div style={{ gap: ".5em" }} className={`${classes.hero} baseVertFlex`}>
        <div className={classes.topHero}>
          Hi, I'm <span className={classes.nameUnderline}>Michael</span>
        </div>
        <div className={`${classes.middleHero} baseFlex`}>
          I'm a<div className={classes.leftBracket}>&lt;</div>
          <div className={classes.webDevText}>full stack web developer</div>
          <div className={classes.rightBracket}>/&gt;</div>
        </div>

        <img
          src={mediumGithubLogo}
          alt={"Github Logo"}
          className={`${classes.bottomHero} ${classes.githubLogo}`}
          onMouseDown={(e) => {
            if (e.button === 1) {
              openInNewTab("https://github.com/michaelongaro");
            }
          }}
          onClick={() => openInNewTab("https://github.com/michaelongaro")}
        />
      </div>
    </div>
  );
}

export default Hero;
