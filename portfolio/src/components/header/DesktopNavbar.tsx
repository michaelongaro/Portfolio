import * as React from "react";

// export interface IAppProps {
// }

import classes from "./DesktopNavbar.module.css";
import "../../index.css";

export function DesktopNavbar(props: any) {
  return (
    <div className={`${classes.navContainer} baseFlex`}>
      <div style={{ gap: "2.5em" }} className={`${classes.navButton} baseFlex`}>
        <a href={"#skills"}>Skills</a>
        <a href={"#projects"}>Projects</a>
        <a href={"#aboutme"}>About Me</a>
        <a href={"#contact"}>Contact</a>
      </div>
    </div>
  );
}
