import { useState, useEffect } from "react";

import anime from "animejs";
import { useInView } from "react-intersection-observer";

// export interface IAppProps {
// }

import openInNewTab from "../../util/openInNewTab";

import html5Icon from "../../assets/html5.png";
import css3Icon from "../../assets/css3.png";
import typeScriptIcon from "../../assets/typescript.png";
import auth0Icon from "../../assets/auth0.png";
import reactIcon from "../../assets/react.png";
import viteIcon from "../../assets/vite.png";
import firebaseIcon from "../../assets/firebase.png";
import nodeJSIcon from "../../assets/nodejs.png";
import gitIcon from "../../assets/git.png";
import smallLightGithubIcon from "../../assets/smallLightGithubLogo.png";
import constructionConeIcon from "../../assets/cone.svg";
import calendarIcon from "../../assets/calendar.svg";

import classes from "./Projects.module.css";
import "../../index.css";

function Projects(props: any) {
  const [hoveringOnProjects, setHoveringOnProjects] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [showVerticalStyling, setShowVerticalStyling] =
    useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showing");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: showVerticalStyling ? 0 : 0.1 }
    );

    const leftHiddenElements = document.querySelectorAll(".hiddenLeft");
    const rightHiddenElements = document.querySelectorAll(".hiddenRight");
    leftHiddenElements.forEach((el) => observer.observe(el));
    rightHiddenElements.forEach((el) => observer.observe(el));
  }, [showVerticalStyling]);

  function updatePictureHoverStates(index: number, newValue: boolean) {
    setHoveringOnProjects((prevProjectStates) => {
      let newProjectStates: boolean[] = [...prevProjectStates];
      newProjectStates[index] = newValue;
      return newProjectStates;
    });
  }

  useEffect(() => {
    resizeHandler();

    function resizeHandler() {
      if (window.innerWidth <= 1000) {
        setShowVerticalStyling(true);
      } else {
        setShowVerticalStyling(false);
      }
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div
      id={"projects"}
      style={{
        marginTop: "8rem",
        gap: "1.5rem",
        width: "100%",
        overflow: "clip",
        scrollMarginTop: "8rem",
      }}
      className={"baseVertFlex"}
    >
      <div className="heading">Projects</div>

      {/* Drawing Dash */}
      <div className={`${classes.projectContainer} hiddenLeft baseFlex`}>
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <div
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
          >
            Drawing Dash
          </div>

          <div
            id={"firstTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={firebaseIcon} alt={"Firebase"} />
            <img className={"icon"} src={auth0Icon} alt={"Auth0"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>
              React + Firebase + Auth0 stack. How to design a full-stack
              application that is both secure and feature rich.
            </li>
            <li>
              React's context management system along with canvas manipulation.
            </li>
            <li>UI/UX/Responsive design fundamentals.</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>
              React's learning curve was quite a struggle coming from vanilla
              JS.
            </li>
            <li>
              Logic and rendering of suspense states + structuring Firebase
              schema + fine-tuning animations.
            </li>
            <li>Tweaking 3rd party modules to fit project's needs.</li>
          </ul>
        </div>

        <div
          style={{
            padding: hoveringOnProjects[0]
              ? ".75em .75em 1em .75em"
              : "1em 1em 1em 1em",
            marginTop: showVerticalStyling ? "0.5rem" : 0,
          }}
          className={`${classes.projectImageContain} baseVertFlex`}
        >
          <img
            className={classes.projectImage}
            src={"https://i.gyazo.com/514de4173276f3b07c811ec94849ec59.png"}
            onClick={() => {
              openInNewTab("https://drawingdash.com/");
            }}
            onMouseEnter={() => {
              updatePictureHoverStates(0, true);
            }}
            onMouseLeave={() => {
              updatePictureHoverStates(0, false);
            }}
          />
          <img
            className={classes.githubIcon}
            src={smallLightGithubIcon}
            alt={"Github"}
            onClick={() => {
              openInNewTab("https://github.com/michaelongaro/DrawingDash");
            }}
          />
        </div>

        <div
          id={"firstTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={reactIcon} alt={"React"} />
          <img className={"icon"} src={firebaseIcon} alt={"Firebase"} />
          <img className={"icon"} src={auth0Icon} alt={"Auth0"} />
          <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Drawing Dash
        </div>
      </div>

      {/* Weather API */}
      <div
        className={`${classes.reversedProjectContainer} hiddenRight baseFlex`}
      >
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <div
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
          >
            Universal Forecast
          </div>

          <div
            id={"secondTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
            <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={viteIcon} alt={"Vite"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>
              Vanilla TypeScript and the value of splitting code up into small
              reusable functions.
            </li>
            <li>
              The fetch API and how to work with retrieving data from an API.
            </li>
            <li>Custom keyboard navigation through autofill search results.</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>DOM manipulation while trying to keep code DRY.</li>
            <li>
              Targeting nested elements from a JSON response and creating an
              interface for the data.
            </li>
            <li>
              Creating layout that is visually pleasing and informative while
              conforming to the API's restrictions.
            </li>
          </ul>
        </div>
        <div
          style={{
            padding: hoveringOnProjects[1]
              ? ".75em .75em 1em .75em"
              : "1em 1em 1em 1em",
            marginTop: showVerticalStyling ? "0.5rem" : 0,
          }}
          className={`${classes.projectImageContain} baseVertFlex`}
        >
          <img
            className={classes.projectImage}
            src={"https://i.gyazo.com/0de8e5b002d91c85dd1cad84ac3c25ec.png"}
            onClick={() => {
              openInNewTab(
                "https://michaelongaro.github.io/UniversalForecast/"
              );
            }}
            onMouseEnter={() => {
              updatePictureHoverStates(1, true);
            }}
            onMouseLeave={() => {
              updatePictureHoverStates(1, false);
            }}
          />
          <img
            className={classes.githubIcon}
            src={smallLightGithubIcon}
            alt={"Github"}
            onClick={() => {
              openInNewTab(
                "https://github.com/michaelongaro/UniversalForecast"
              );
            }}
          />
        </div>

        <div
          id={"secondTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
          <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
          <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
          <img className={"icon"} src={viteIcon} alt={"Vite"} />
          <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Universal Forecast
        </div>
      </div>

      {/* Office Website */}
      <div className={`${classes.projectContainer} hiddenLeft baseFlex`}>
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <div
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
          >
            Anthony A. Ongaro DDS
          </div>

          <div
            id={"thirdTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={viteIcon} alt={"Vite"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div className={`${classes.blurred} baseVertFlex`}>
            <div>What I learned:</div>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </li>
            </ul>

            <div>Challenges:</div>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            padding: hoveringOnProjects[2]
              ? ".75em .75em 1em .75em"
              : "1em 1em 1em 1em",
            marginTop: showVerticalStyling ? "0.5rem" : 0,
          }}
          className={`${classes.projectImageContain} baseVertFlex`}
        >
          <div className={`${classes.stackedContainer} baseFlex`}>
            <img
              style={{ filter: "blur(2px)" }}
              className={` ${classes.projectImage} ${classes.blurred}`}
              src={
                "https://mbluxury1.s3.amazonaws.com/2021/09/03151922/tend.jpg"
              }
              // onMouseEnter={() => {
              //   updatePictureHoverStates(2, true);
              // }}
              // onMouseLeave={() => {
              //   updatePictureHoverStates(2, false);
              // }}
            />
            <div className={`${classes.warningContainer} baseVertFlex`}>
              <img src={constructionConeIcon} alt={"Construction cone"} />
              Under Construction
            </div>
          </div>
          <img
            className={classes.githubIcon}
            src={smallLightGithubIcon}
            alt={"Github"}
            onClick={() => {
              openInNewTab(
                "https://github.com/michaelongaro/AnthonyAOngaroDDS"
              );
            }}
          />
        </div>

        <div
          id={"thirdTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={reactIcon} alt={"React"} />
          <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
          <img className={"icon"} src={viteIcon} alt={"Vite"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Anthony A. Ongaro DDS
        </div>
      </div>

      {/* Lyricize (Spotify API App) */}
      <div
        className={`${classes.reversedProjectContainer} hiddenRight baseFlex`}
      >
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <div
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
          >
            Lyricize
          </div>

          <div
            id={"fourthTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={viteIcon} alt={"Vite"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div className={`${classes.blurred} baseVertFlex`}>
            <div>What I learned:</div>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </li>
            </ul>

            <div>Challenges:</div>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            padding: hoveringOnProjects[3]
              ? ".75em .75em 1em .75em"
              : "1em 1em 1em 1em",
            marginTop: showVerticalStyling ? "0.5rem" : 0,
          }}
          className={`${classes.projectImageContain} baseVertFlex`}
        >
          <div className={`${classes.stackedContainer} baseFlex`}>
            <img
              style={{ filter: "blur(2px)" }}
              className={` ${classes.projectImage} ${classes.blurred}`}
              src={
                "https://images.unsplash.com/photo-1480380799266-582d808d748a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              }
              // onMouseEnter={() => {
              //   updatePictureHoverStates(3, true);
              // }}
              // onMouseLeave={() => {
              //   updatePictureHoverStates(3, false);
              // }}
            />

            <div className={`${classes.warningContainer} baseVertFlex`}>
              <img src={calendarIcon} alt={"Calendar icon"} />
              Coming Soon...
            </div>
          </div>

          <img
            className={classes.githubIcon}
            src={smallLightGithubIcon}
            alt={"Github"}
            onClick={() => {
              openInNewTab("https://github.com/michaelongaro/Lyricize");
            }}
          />
        </div>

        <div
          id={"fourthTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
          <img className={"icon"} src={reactIcon} alt={"React"} />
          <img className={"icon"} src={viteIcon} alt={"Vite"} />
          <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Lyricize
        </div>
      </div>
    </div>
  );
}

export default Projects;
