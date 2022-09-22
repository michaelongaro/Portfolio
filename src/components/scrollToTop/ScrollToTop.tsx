import { useState, useEffect } from "react";

import upArrowIcon from "../../assets/upArrow.svg";

import classes from "./ScrollToTop.module.css";
import "../../index.css";

export function ScrollToTop(props: any) {
  const [scrollThresholdReached, setScrollThresholdReached] =
    useState<boolean>(false);

  useEffect(() => {
    function handleScroll() {
      setScrollThresholdReached(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      style={{
        opacity: scrollThresholdReached ? 1 : 0,
        pointerEvents: scrollThresholdReached ? "auto" : "none",
      }}
      className={`${classes.scrollToTopContainer} baseFlex`}
      onClick={() => window.scrollTo(0, 0)}
      href={"#"}
    >
      <img
        style={{ width: "25px", height: "25px" }}
        src={upArrowIcon}
        alt={"Scroll to top"}
      />
    </a>
  );
}
