import * as React from "react";

import profileIcon from "../../assets/profile.svg";
import questionMarkIcon from "../../assets/question-mark.svg";
import codeIcon from "../../assets/window.svg";
import wrenchIcon from "../../assets/wrench.svg";
import lightbulbIcon from "../../assets/lamp.svg";

import classes from "./AboutMe.module.css";
import "../../index.css";

function AboutMe(props: any) {
  return (
    <div
      id={"aboutme"}
      style={{ marginTop: "7.25rem", gap: "2rem", scrollMargin: "8rem" }}
      className={"baseVertFlex"}
    >
      <div className={"heading"}>About Me</div>

      <div className={`${classes.aboutMeContainer} baseFlex`}>
        <div className={classes.avatarContainer}>
          <ul className={classes.iconContainer}>
            <li>
              <img src={questionMarkIcon} alt={""} />
            </li>
            <li>
              <img src={lightbulbIcon} alt={""} />
            </li>
            <li>
              <img src={codeIcon} alt={""} />
            </li>
            <li>
              <img src={wrenchIcon} alt={""} />
            </li>
          </ul>

          <img
            className={classes.profileIcon}
            src={profileIcon}
            alt={"Profile Outline"}
          />
        </div>

        <p className={classes.aboutMeText}>
          My name is Michael Ongaro and I am incredibly passionate about
          learning how to create more enjoyable, accessible, and feature-rich
          web apps. I believe that small, deliberate, and consistent
          iteration-based design is the key to improving any project. I will
          always try to include the bleeding edge of new technologies whenever
          applicable.
        </p>
      </div>
    </div>
  );
}

export default AboutMe;
