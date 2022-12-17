import { useState, useEffect } from "react";

// export interface IAppProps {
// }

import openInNewTab from "../../util/openInNewTab";

import html5Icon from "../../assets/html5.png";
import css3Icon from "../../assets/css3.png";
import typeScriptIcon from "../../assets/typescript.png";
import auth0Icon from "../../assets/auth0.png";
import reactIcon from "../../assets/react.png";
import viteIcon from "../../assets/vite.png";
import mongoDB from "../../assets/mongodb.png";
import firebaseIcon from "../../assets/firebase.png";
import jestIcon from "../../assets/jest.png";
import nodeJSIcon from "../../assets/nodejs.png";
import gitIcon from "../../assets/git.png";
import nextIcon from "../../assets/nextjs.svg";
import trpcIcon from "../../assets/trpc.svg";
import prismaIcon from "../../assets/prisma.svg";
import postgresIcon from "../../assets/postgresql.svg";
import tailwindIcon from "../../assets/tailwind.svg";
import smallLightGithubIcon from "../../assets/smallLightGithubLogo.png";
import constructionConeIcon from "../../assets/cone.svg";

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

  // move to a hook?
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("showing");
          observer.unobserve(entry.target);
        }
      });
    });

    const leftHiddenElements = document.querySelectorAll(".hiddenLeft");
    const rightHiddenElements = document.querySelectorAll(".hiddenRight");
    leftHiddenElements.forEach((el) => observer.observe(el));
    rightHiddenElements.forEach((el) => observer.observe(el));
  }, []);

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

  // should have each individual project below be in a general <Project />
  // that takes in an object called details/metadata that has all specific data
  // for that project and fills it into the jsx

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
          <a
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
            href={"https://drawingdash.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Drawing Dash
          </a>

          <div
            id={"firstTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={firebaseIcon} alt={"Firebase"} />
            <img className={"icon"} src={auth0Icon} alt={"Auth0"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>
              React + Firebase + Auth0 stack. How to design a full-stack
              application that is both secure and feature rich.
            </li>
            <li>
              React's built-in context management system along with canvas
              manipulation techniques.
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
            <li>
              Modifications to "react-slideshow-image" and "react-easy-crop"
              libraries to achieve desired functionality.
            </li>
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
            src={"https://i.gyazo.com/961e9be0427c8298ca89b5b19a85d239.png"}
            alt={"Screenshot of my first project, Drawing Dash."}
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

      {/* Stash */}
      <div
        className={`${classes.reversedProjectContainer} hiddenRight baseFlex`}
      >
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <a
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
            href={"https://stash-xi.vercel.app/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stash
          </a>

          <div
            id={"secondTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={nextIcon} alt={"NextJS"} />
            <img className={"icon"} src={trpcIcon} alt={"TRPC"} />
            <img className={"icon"} src={prismaIcon} alt={"Prisma"} />
            <img className={"icon"} src={postgresIcon} alt={"PostgreSQL"} />
            <img className={"icon"} src={tailwindIcon} alt={"TailwindCSS"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>
              How and why you would want to implement optimistic fetching. Basic
              cache fundamentals with tRPC (a typesafe React Query wrapper).
            </li>
            <li>
              How to quickly prototype out a design with Tailwind, including
              custom + responsive classes. Also I feel much more confident with
              CSS Grid, since it was the cornerstone of all user modals.
            </li>
            <li>
              How to structure a PostgreSQL schema within Prisma to be concise
              and scalable.
            </li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>
              Despite the T3 stack handling some folder scaffolding for me,
              understanding how each technology interacted with one another took
              a great deal of research.
            </li>
            <li>
              Creating a tRPC API route that fetches a low resolution
              placeholder for the image being requested.
            </li>
            <li>
              Custom responsive styling for the image editor and slideshow
              components.
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
          <div className={`${classes.stackedContainer} baseFlex`}>
            <img
              className={classes.projectImage}
              src={"https://i.gyazo.com/b82af8a596e46e6688c24a99cdc3b0e0.jpg"}
              alt={
                "Sample screenshot of my second project, an image storage/hosting web app."
              }
              onClick={() => {
                openInNewTab("https://stash-xi.vercel.app/");
              }}
              onMouseEnter={() => {
                updatePictureHoverStates(1, true);
              }}
              onMouseLeave={() => {
                updatePictureHoverStates(1, false);
              }}
            />
          </div>
          <img
            className={classes.githubIcon}
            src={smallLightGithubIcon}
            alt={"Github"}
            onClick={() => {
              openInNewTab("https://github.com/michaelongaro/stash");
            }}
          />
        </div>

        <div
          id={"secondTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
          <img className={"icon"} src={nextIcon} alt={"NextJS"} />
          <img className={"icon"} src={trpcIcon} alt={"TRPC"} />
          <img className={"icon"} src={prismaIcon} alt={"Prisma"} />
          <img className={"icon"} src={postgresIcon} alt={"PostgreSQL"} />
          <img className={"icon"} src={tailwindIcon} alt={"TailwindCSS"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Stash
        </div>
      </div>

      {/* Lyricize (Spotify API App) */}
      <div className={`${classes.projectContainer} hiddenLeft baseFlex`}>
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <a
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
            href={"https://lyricize-app.herokuapp.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lyricize
          </a>

          <div
            id={"thirdTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={reactIcon} alt={"React"} />
            <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
            <img className={"icon"} src={mongoDB} alt={"MongoDB"} />
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={jestIcon} alt={"Jest"} />
            <img className={"icon"} src={viteIcon} alt={"Vite"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>
              How to communicate between the frontend and backend on the MERN
              stack. Making certain axios calls within custom hooks for code
              readability.
            </li>
            <li>
              How to use MongoDB (with mongoose) to achieve basic CRUD
              functionality. Pros and cons of a non-relational database.
            </li>
            <li>
              How to tweak an installed npm package and keep the changes in
              production with the "patch-package" library.
            </li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>
              Testing various lyric-fetching npm packages to find one that fit
              the project's needs.
            </li>
            <li>
              Sanitizing the fetched lyric data by remove any extraneous
              metadata, punctuation, and variable whitespace with RegEx.
            </li>
            <li>
              Splitting up the API requests into small chunks to avoid Heroku's
              30 second maximum timeout for HTTP requests.
            </li>
          </ul>
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
              className={classes.projectImage}
              src={"https://i.gyazo.com/b48c4d7bf04f4f4e1b61ef574dc6ab42.png"}
              alt={""}
              onClick={() => {
                openInNewTab("https://lyricize-app.herokuapp.com/");
              }}
              onMouseEnter={() => {
                updatePictureHoverStates(2, true);
              }}
              onMouseLeave={() => {
                updatePictureHoverStates(2, false);
              }}
            />
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
          id={"thirdTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={reactIcon} alt={"React"} />
          <img className={"icon"} src={nodeJSIcon} alt={"NodeJS"} />
          <img className={"icon"} src={mongoDB} alt={"MongoDB"} />
          <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
          <img className={"icon"} src={viteIcon} alt={"Vite"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Lyricize
        </div>
      </div>

      {/* Weather API */}
      <div
        className={`${classes.reversedProjectContainer} hiddenRight baseFlex`}
      >
        <div className={`${classes.projectDetails} baseVertFlex`}>
          <a
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={classes.projectTitle}
            href={"https://michaelongaro.github.io/UniversalForecast/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Universal Forecast
          </a>

          <div
            id={"fourthTechUsed"}
            style={{ display: showVerticalStyling ? "none" : "flex" }}
            className={`${classes.techIcons} baseFlex`}
          >
            <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
            <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
            <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
            <img className={"icon"} src={viteIcon} alt={"Vite"} />
            <img className={"icon"} src={gitIcon} alt={"Git"} />
          </div>

          <div>What I learned:</div>
          <ul>
            <li>
              Vanilla TypeScript and the value of splitting code up into small
              reusable functions.
            </li>
            <li>
              The Fetch API and how to properly retrieve data from an API.
            </li>
            <li>How to handle custom keyboard navigation through a list.</li>
          </ul>

          <div>Challenges:</div>
          <ul>
            <li>DOM manipulation while trying to keep DRY code.</li>
            <li>
              Targeting nested elements from a JSON response and creating an
              interface for the data.
            </li>
            <li>
              Creating a layout that is visually pleasing and informative while
              conforming to the API's restrictions.
            </li>
          </ul>
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
          <img
            className={classes.projectImage}
            src={"https://i.gyazo.com/0de8e5b002d91c85dd1cad84ac3c25ec.png"}
            alt={"Screenshot of my fourth project, Universal Forecast."}
            onClick={() => {
              openInNewTab(
                "https://michaelongaro.github.io/UniversalForecast/"
              );
            }}
            onMouseEnter={() => {
              updatePictureHoverStates(3, true);
            }}
            onMouseLeave={() => {
              updatePictureHoverStates(3, false);
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
          id={"fourthTechUsed"}
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={`${classes.techIcons} baseFlex`}
        >
          <img className={"icon"} src={html5Icon} alt={"HTML 5"} />
          <img className={"icon"} src={css3Icon} alt={"CSS 3"} />
          <img className={"icon"} src={typeScriptIcon} alt={"TypeScript"} />
          <img className={"icon"} src={viteIcon} alt={"Vite"} />
          <img className={"icon"} src={gitIcon} alt={"Git"} />
        </div>

        <div
          style={{ display: showVerticalStyling ? "flex" : "none" }}
          className={classes.projectTitle}
        >
          Universal Forecast
        </div>
      </div>
    </div>
  );
}

export default Projects;
