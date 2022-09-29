import { useState, useEffect } from "react";

import upArrowIcon from "../../assets/upArrow.svg";

import classes from "./ScrollToTop.module.css";
import "../../index.css";

function ScrollToTop(props: any) {
  const [scrollThresholdReached, setScrollThresholdReached] =
    useState<boolean>(false);

  useEffect(() => {
    function handleScroll() {
      setScrollThresholdReached(
        window.scrollY > Math.floor(0.25 * window.innerHeight)
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      style={{
        opacity: scrollThresholdReached ? 1 : 0,
        pointerEvents: scrollThresholdReached ? "auto" : "none",
      }}
      className={`${classes.scrollToTopContainer} baseFlex`}
      onClick={() => {
        history.pushState(null, "", "/Portfolio/");
        window.scrollTo(0, 0);
      }}
    >
      <img src={upArrowIcon} alt={"Scroll to top"} />
    </button>
  );
}

export default ScrollToTop;
