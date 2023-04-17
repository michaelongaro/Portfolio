import { useState, useEffect } from "react";

import upArrowIcon from "../../assets/upArrow.svg";

import classes from "./ScrollToTop.module.css";
import "../../index.css";

interface IDynamicHoverStyles {
  backgroundColor: string;
  filter: string;
}

function ScrollToTop() {
  const [dynamicHoverStyles, setDynamicHoverStyles] =
    useState<IDynamicHoverStyles>({
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      filter: "brightness(1)",
    });
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

  function showHoveredStyles() {
    setDynamicHoverStyles({
      backgroundColor: "#ed9f31",
      filter: "brightness(1.1)",
    });
  }

  function hideHoveredStyles() {
    setDynamicHoverStyles({
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      filter: "none",
    });
  }

  return (
    <button
      tabIndex={43}
      style={{
        opacity: scrollThresholdReached ? 1 : 0,
        pointerEvents: scrollThresholdReached ? "auto" : "none",
        ...dynamicHoverStyles,
      }}
      className={`${classes.scrollToTopContainer} baseFlex`}
      onMouseEnter={showHoveredStyles}
      onMouseLeave={hideHoveredStyles}
      onTouchStart={showHoveredStyles}
      onTouchCancel={hideHoveredStyles}
      onTouchEnd={hideHoveredStyles}
      onClick={() => {
        history.pushState(null, "", "/");
        window.scrollTo(0, 0);
        hideHoveredStyles();
      }}
    >
      <img src={upArrowIcon} alt={"Scroll to top"} />
    </button>
  );
}

export default ScrollToTop;
