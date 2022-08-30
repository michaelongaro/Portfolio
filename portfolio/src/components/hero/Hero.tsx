import * as React from "react";

// export interface IAppProps {
// }

import heroBackgroundPattern from "../../assets/heroBackgroundPattern.svg";

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
      </div>
    </div>
  );
}
