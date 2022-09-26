import * as React from "react";

import useNavbarHighlighter from "../../util/useNavbarHighlighter";

// export interface IAppProps {
// }

import classes from "./DesktopNavbar.module.css";
import "../../index.css";

function DesktopNavbar(props: any) {
  let linkStates = useNavbarHighlighter();

  function updateLinkStates(idx: number) {
    let tempLinkStates: boolean[] = [false, false, false, false];

    tempLinkStates[idx] = true;

    linkStates = tempLinkStates;
  }

  return (
    <div className={classes.navContainer}>
      <div className={`${classes.navLinks} baseFlex`}>
        <div
          style={{ gap: "2.5em" }}
          className={`${classes.navButton} baseFlex`}
        >
          <a
            className={linkStates[0] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(0);
            }}
            href={"#skills"}
          >
            Skills
          </a>
          <a
            className={linkStates[1] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(1);
            }}
            href={"#projects"}
          >
            Projects
          </a>
          <a
            className={linkStates[2] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(2);
            }}
            href={"#aboutme"}
          >
            About Me
          </a>
          <a
            className={linkStates[3] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(3);
            }}
            href={"#contact"}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default DesktopNavbar;
