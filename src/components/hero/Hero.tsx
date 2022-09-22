import openInNewTab from "../../util/openInNewTab";

import heroBackgroundPattern from "../../assets/heroBackgroundPattern.svg";
import mediumGithubLogo from "../../assets/mediumGithubLogo.png";

import classes from "./Hero.module.css";
import "../../index.css";

export function Hero(props: any) {
  return (
    <div
      style={{ position: "relative", height: "100vh" }}
      className={"baseFlex"}
    >
      <img
        className={classes.backgroundPattern}
        src={heroBackgroundPattern}
        alt={"Background Pattern"}
      />

      <div style={{ gap: ".5em" }} className={`${classes.hero} baseVertFlex`}>
        <div
          style={{
            fontSize: "4rem",
            textShadow: "rgb(118 118 118 / 57%) 4px 4px 9px",
          }}
          className={classes.topHero}
        >
          Hi, I'm <span className={classes.nameUnderline}>Michael</span>
        </div>
        <div className={`${classes.middleHero} baseFlex`}>
          I'm a<div className={classes.leftBracket}>&lt;</div>
          <div className={classes.webDevText}>full stack web developer</div>
          <div className={classes.rightBracket}>/&gt;</div>.
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
