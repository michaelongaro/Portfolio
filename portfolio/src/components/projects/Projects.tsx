import { useState, useEffect } from "react";

import anime from "animejs";
import { useInView } from "react-intersection-observer";

// export interface IAppProps {
// }

import heroBackgroundPattern from "../../assets/heroBackgroundPattern.svg";

import html5Icon from "../../assets/html5.png";
import css3Icon from "../../assets/css3.png";
import javaScriptIcon from "../../assets/javascript.png";
import typeScriptIcon from "../../assets/typescript.png";
import reactIcon from "../../assets/react.png";
import firebaseIcon from "../../assets/firebase.png";
import nodeJSIcon from "../../assets/nodejs.png";
import gitIcon from "../../assets/git.png";

import classes from "./Projects.module.css";
import "../../index.css";

export function Projects(props: any) {
  const [drawingDashRef, firstInView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [weatherAPIRef, secondInView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [officeWebsiteRef, thirdInView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [lyricizeRef, fourthInView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (firstInView) {
      anime({
        targets: "#firstTechUsed .icon",
        opacity: [0, 1],
        // duration: 4000,
        delay: anime.stagger(200),
      });
    }

    if (secondInView) {
      anime({
        targets: "#secondTechUsed .icon",
        opacity: [0, 1],
        duration: 4000,
        delay: anime.stagger(200),
      });
    }

    if (thirdInView) {
      anime({
        targets: "#thirdTechUsed.icon",
        opacity: [0, 1],
        duration: 4000,
        delay: anime.stagger(200),
      });
    }

    if (fourthInView) {
      anime({
        targets: "#fourthTechUsed.icon",
        opacity: [0, 1],
        duration: 4000,
        delay: anime.stagger(200),
      });
    }
  }, [firstInView, secondInView, thirdInView, fourthInView]);

  return (
    <div
      id={"projects"}
      style={{
        marginTop: "8rem",
        gap: "1.5rem",
        width: "100%",
        scrollMargin: "8rem",
      }}
      className={"baseVertFlex"}
    >
      <div className="heading">Projects</div>

      {/* maybe have fonts used in projects be used for
    each description? */}

      {/* maybe have for left */}

      {/* Drawing Dash */}
      <div
        ref={drawingDashRef}
        className={`${classes.projectContainer} baseFlex`}
      >
        <div
          style={{ gap: "1em" }}
          className={`${classes.projectDetails} baseVertFlex`}
        >
          <div className={classes.projectTitle}>Drawing Dash</div>

          <div id={"firstTechUsed"} className={`${classes.techIcons} baseFlex`}>
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={firebaseIcon} alt={"Firebase"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>
        </div>
        <div className={classes.projectImageContain}>
          <img
            src={
              "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg"
            }
          />
        </div>
      </div>

      {/* Weather API */}
      <div
        ref={weatherAPIRef}
        className={`${classes.reversedProjectContainer} baseFlex`}
      >
        <div
          style={{ gap: "1em" }}
          className={`${classes.projectDetails} baseVertFlex`}
        >
          <div className={classes.projectTitle}>Weekly Forcast</div>

          <div
            id={"secondTechUsed"}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
            <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
            <img className={"icon"} src={javaScriptIcon} alt={"JavaScript"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>
        </div>
        <div
          style={{ padding: "1em 1em 1em 0" }}
          className={classes.projectImageContain}
        >
          <img
            src={
              "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg"
            }
          />
        </div>
      </div>

      {/* Office Website */}
      <div
        ref={officeWebsiteRef}
        className={`${classes.projectContainer} baseFlex`}
      >
        <div
          style={{ gap: "1em" }}
          className={`${classes.projectDetails} baseVertFlex`}
        >
          <div className={classes.projectTitle}>Anthony A. Ongaro DDS</div>

          <div id={"thirdTechUsed"} className={`${classes.techIcons} baseFlex`}>
            <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
            <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>
        </div>
        <div className={classes.projectImageContain}>
          <img
            src={
              "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg"
            }
          />
        </div>
      </div>

      {/* Lyricize (Spotify API) */}
      <div
        ref={lyricizeRef}
        className={`${classes.reversedProjectContainer} baseFlex`}
      >
        <div
          style={{ gap: "1em" }}
          className={`${classes.projectDetails} baseVertFlex`}
        >
          <div className={classes.projectTitle}>Lyricize</div>

          <div
            id={"fourthTechUsed"}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={firebaseIcon} alt={"Firebase"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>
        </div>
        <div
          style={{ padding: "1em 1em 1em 0" }}
          className={classes.projectImageContain}
        >
          <img
            src={
              "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
}
