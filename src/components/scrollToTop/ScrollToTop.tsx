import { useState, useEffect, useRef } from "react";

import upArrowIcon from "../../assets/upArrow.svg";

import classes from "./ScrollToTop.module.css";
import "../../index.css";

function ScrollToTop() {
  const [scrollThresholdReached, setScrollThresholdReached] =
    useState<boolean>(false);

  const upArrowRef = useRef<HTMLButtonElement>(null);

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

  function blur() {
    upArrowRef.current?.blur();
  }

  return (
    <button
      tabIndex={43}
      ref={upArrowRef}
      style={{
        opacity: scrollThresholdReached ? 1 : 0,
        pointerEvents: scrollThresholdReached ? "auto" : "none",
      }}
      className={`${classes.scrollToTopContainer} baseFlex`}
      onMouseLeave={blur}
      onTouchCancel={blur}
      onClick={() => {
        history.pushState(null, "", "/");
        window.scrollTo(0, 0);
        blur();
      }}
    >
      <img src={upArrowIcon} alt={"Scroll to top"} />
    </button>
  );
}

export default ScrollToTop;
