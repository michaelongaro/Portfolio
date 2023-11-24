import myHeadshot from "../../assets/headshot.jpg";
import externalLink from "../../assets/externalLink.svg";
import resumePDF from "../../assets/MichaelOngaroResume.pdf";

import classes from "./AboutMe.module.css";
import "../../index.css";

function AboutMe() {
  return (
    <div id={"aboutme"} className={`baseVertFlex ${classes.aboutMeContainer}`}>
      <h2 className={"heading"}>About Me</h2>

      <div className={`${classes.bodyContainer} baseFlex`}>
        <div className={classes.headshotContainer}>
          <img
            className={classes.headshot}
            src={myHeadshot}
            alt={"A close-up professional image of my face."}
          />
        </div>

        <div className={`${classes.aboutMeTextContainer} baseVertFlex`}>
          <p className={classes.aboutMeText}>
            My name is Michael Ongaro, and I am a passionate web developer with
            a focus on creating accessible, enjoyable, and feature-rich web
            applications. I believe in the power of small, consistent
            improvements to drive progress and success. Whether working with
            established technologies or exploring the cutting-edge, I am always
            eager to learn and innovate.
          </p>

          <p className={classes.aboutMeText}>
            One of the things that sets me apart as a developer is my focus on
            accessibility. I believe that all web applications should be
            designed to be inclusive and usable by everyone, regardless of their
            abilities or disabilities. To achieve this goal, I follow industry
            best practices and strive to stay up-to-date with the latest
            accessibility standards and guidelines to ensure that my work is
            always compliant.
          </p>
        </div>
      </div>

      <a
        tabIndex={47}
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
