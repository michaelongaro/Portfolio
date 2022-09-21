import * as React from "react";

import profileIcon from "../../assets/profile.svg";
import questionMarkIcon from "../../assets/question-mark.svg";
import codeIcon from "../../assets/window.svg";
import wrenchIcon from "../../assets/wrench.svg";
import lightbulbIcon from "../../assets/lamp.svg";

import classes from "./AboutMe.module.css";
import "../../index.css";

export function AboutMe(props: any) {
  return (
    <div
      id={"aboutme"}
      style={{ marginTop: "8rem", gap: "2rem", scrollMargin: "8rem" }}
      className={"baseVertFlex"}
    >
      <div className={"heading"}>About Me</div>

      <div className={`${classes.aboutMeContainer} baseFlex`}>
        {/* hmm maybe generic user skeleton image and then in an arc around it 
        (idk how you would do that, look it up) have icons for a lightbulb,
  </>, wrench, and  "?" in that order */}

        <div className={classes.avatarContainer}>
          {/* <div className={classes.test}></div> */}

          <ul className={classes.iconContainer}>
            <li>
              <img src={questionMarkIcon} />
            </li>
            <li>
              <img src={lightbulbIcon} />
            </li>
            <li>
              <img src={codeIcon} />
            </li>
            <li>
              <img src={wrenchIcon} />
            </li>
          </ul>

          <img
            className={classes.profileIcon}
            src={profileIcon}
            alt={"Profile Outline"}
          />
        </div>

        <p className={classes.aboutMeText}>
          I am incredibly passionate about learning how to create more
          enjoyable, accessable, and feature-rich React apps. I believe that
          small, deliberate, and consistent iteration-based design is the key to
          improving any project. I will always try to include the bleeding edge
          of new technologies whenever applicable.
        </p>
      </div>
    </div>
  );
}