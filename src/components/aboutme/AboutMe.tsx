import profileIcon from "../../assets/profile.svg";
import questionMarkIcon from "../../assets/question-mark.svg";
import codeIcon from "../../assets/window.svg";
import wrenchIcon from "../../assets/wrench.svg";
import lightbulbIcon from "../../assets/lamp.svg";
import externalLink from "../../assets/externalLink.svg";
import resumePDF from "../../assets/MichaelOngaroResume.pdf";

import classes from "./AboutMe.module.css";
import "../../index.css";

function AboutMe(props: any) {
  return (
    <div
      id={"aboutme"}
      style={{ marginTop: "7.25rem", scrollMargin: "8rem" }}
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
          My name is Michael Ongaro, and I am a passionate web developer with a
          focus on creating accessible, enjoyable, and feature-rich web
          applications. I believe in the power of small, consistent improvements
          to drive progress and success. Whether working with established
          technologies or exploring the cutting-edge, I am always eager to learn
          and innovate.
        </p>
      </div>

      <a
        className={classes.resumeButton}
        href={resumePDF}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open resume
        <img
          style={{ width: "1rem", height: "1rem" }}
          src={externalLink}
          alt={"external link icon"}
        ></img>
      </a>
    </div>
  );
}

export default AboutMe;
