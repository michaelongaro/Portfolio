import * as React from "react";

// export interface IAppProps {
// }

import classes from "./Hero.module.css";
import "../../index.css";

export function Hero(props: any) {
  return (
    <div className={"baseFlex"}>
      <div style={{ gap: ".5em" }} className={`${classes.hero} baseVertFlex`}>
        <div style={{ fontSize: "4rem" }}>
          Hi, I'm <span>Michael</span>
        </div>
        <div style={{ gap: ".5rem", fontSize: "3rem" }} className={"baseFlex"}>
          {/* maybe animate the < and /> pushing the text on the left and the . on the right? */}
          I'm a <div>&lt;</div>full stack web developer<div>/&gt;</div>.
        </div>
      </div>
    </div>
  );
}
