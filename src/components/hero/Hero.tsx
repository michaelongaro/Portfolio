import { useEffect } from "react";

import anime from "animejs";
import openInNewTab from "../../util/openInNewTab";

import heroBackgroundPattern from "../../assets/heroBackgroundPattern.svg";
import mediumGithubLogo from "../../assets/mediumGithubLogo.png";

import classes from "./Hero.module.css";
import "../../index.css";

export function Hero(props: any) {
  useEffect(() => {
    anime({
      targets: "#overlay",
      width: [0, "100%"],
      height: [0, "33%"],
      // rotate: [0, "45deg"],
      opacity: [0, 1],
      delay: 100,
      duration: 2550,
    });

    anime({
      targets: "#heroContent",
      opacity: [0, 1],
      duration: 5550,
    });
  }, []);

  return (
    <div
      style={{ position: "relative", height: "100vh" }}
      className={classes.parentGrid}
    >
      <div id={"overlay"} className={classes.overlay}></div>
      <div
        // style={{ position: "relative", height: "100vh" }}
        className={"baseFlex"}
      >
        <img
          className={classes.backgroundPattern}
          src={heroBackgroundPattern}
          alt={"Background Pattern"}
        />

        <div
          id={"heroContent"}
          style={{ gap: ".5em" }}
          className={`${classes.hero} baseVertFlex`}
        >
          <div
            style={{
              fontSize: "4rem",
              textShadow: "rgb(118 118 118 / 57%) 4px 4px 9px",
            }}
          >
            Hi, I'm <span>Michael</span>
          </div>
          <div
            style={{
              gap: ".5rem",
              fontSize: "3rem",
              textShadow: "rgb(118 118 118 / 57%) 4px 4px 9px",
            }}
            className={"baseFlex"}
          >
            {/* maybe animate the < and /> pushing the text on the left and the . on the right? */}
            I'm a <div>&lt;</div>full stack web developer<div>/&gt;</div>.
          </div>

          <img
            src={mediumGithubLogo}
            alt={"Github Logo"}
            className={classes.githubLogo}
            onMouseDown={(e) => {
              if (e.button === 1) {
                openInNewTab("https://github.com/michaelongaro");
              }
            }}
            onClick={() => openInNewTab("https://github.com/michaelongaro")}
          />
        </div>
      </div>
    </div>
  );
}
