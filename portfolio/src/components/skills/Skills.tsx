import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";
import anime from "animejs";

import html5Icon from "../../assets/html5.png";
import css3Icon from "../../assets/css3.png";
import javaScriptIcon from "../../assets/javascript.png";
import typeScriptIcon from "../../assets/typescript.png";
import reactIcon from "../../assets/react.png";
import firebaseIcon from "../../assets/firebase.png";
import nodeJSIcon from "../../assets/nodejs.png";
import gitIcon from "../../assets/git.png";

import classes from "./Skills.module.css";
import "../../index.css";

export function Skills(props: any) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      anime({
        targets: "#iconGrid .icon",
        opacity: [0, 1],
        duration: 4000,
        delay: anime.stagger(200, { grid: [4, 2], from: "first" }),
      });
    } else {
      anime({
        targets: "#iconGrid .icon",
        opacity: [1, 0],
        duration: 4000,
        delay: anime.stagger(200, { grid: [4, 2], from: "last" }),
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      id={"skills"}
      style={{ marginTop: "8rem", gap: "2rem", scrollMargin: "8rem" }}
      className={"baseVertFlex"}
    >
      <div className={"heading"}>Skills</div>

      <div
        style={{ gap: "1rem" }}
        id={"iconGrid"}
        className={classes.skillsContainer}
      >
        <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
        <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
        <img className={"icon"} src={javaScriptIcon} alt={"JavaScript"} />
        <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
        <img className={"icon"} src={reactIcon} alt={"React"} />
        <img className={"icon"} src={firebaseIcon} alt={"Firebase"} />
        <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
        <img className={"icon"} src={gitIcon} alt={"Git"} />
      </div>
    </div>
  );
}
