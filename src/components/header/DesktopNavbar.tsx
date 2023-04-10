import { useRef } from "react";

import useNavbarHighlighter from "../../util/useNavbarHighlighter";

// export interface IAppProps {
// }

import classes from "./DesktopNavbar.module.css";
import "../../index.css";

function DesktopNavbar(props: any) {
  let linkStates = useNavbarHighlighter();

  const logoRef = useRef<HTMLAnchorElement>(null);

  function updateLinkStates(idx: number) {
    let tempLinkStates: boolean[] = [false, false, false, false];

    tempLinkStates[idx] = true;

    linkStates = tempLinkStates;
  }

  return (
    <div className={classes.navContainer}>
      <div className={`${classes.navLinks} baseFlex`}>
        <a
          ref={logoRef}
          tabIndex={1}
          className={classes.logo}
          href={"/"}
          onClick={(event) => {
            event.preventDefault();
            history.pushState(null, "", "/");
            window.scrollTo(0, 0);
            logoRef.current?.blur();
          }}
        >
          Michael Ongaro
        </a>
        <div
          style={{ gap: "2.5em" }}
          className={`${classes.navButton} baseFlex`}
        >
          <a
            tabIndex={2}
            className={linkStates[0] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(0);
            }}
            href={"#skills"}
          >
            Skills
          </a>
          <a
            tabIndex={3}
            className={linkStates[1] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(1);
            }}
            href={"#projects"}
          >
            Projects
          </a>
          <a
            tabIndex={4}
            className={linkStates[2] ? classes.selected : ""}
            onClick={() => {
              updateLinkStates(2);
            }}
            href={"#aboutme"}
          >
            About Me
          </a>
          <a
            tabIndex={5}
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
