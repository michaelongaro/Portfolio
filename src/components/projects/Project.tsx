import { useState, useRef, useEffect, useLayoutEffect } from "react";
import openInNewTab from "../../util/openInNewTab";

import smallLightGithubIcon from "../../assets/smallLightGithubLogo.png";
import externalLink from "../../assets/externalLink.svg";

import classes from "./Project.module.css";

export interface IProject {
  title: string;
  link: string;
  description: string;
  whatILearned: string[];
  challenges: string[];
  technologies: ITechnology[];
  screenshotLink: string;
  screenshotAltText: string;
  githubRepoLink: string;
  slideInFromLeft: boolean;
  projectNumber: number;
  projectNumberBeingShownCurrently: number;
  setProjectNumberBeingShownCurrently: React.Dispatch<
    React.SetStateAction<number>
  >;
}

interface ITechnology {
  imageLocation: string;
  altText: string;
}

function Project({
  title,
  link,
  description,
  whatILearned,
  challenges,
  technologies,
  screenshotLink,
  screenshotAltText,
  githubRepoLink,
  slideInFromLeft,
  projectNumber,
  projectNumberBeingShownCurrently,
  setProjectNumberBeingShownCurrently,
}: IProject) {
  const [showWhatILearned, setShowWhatILearned] = useState(true);
  const [backgroundPositionX, setBackgroundPositionX] = useState("100%");

  const [hoveringOverTitleAndTechStack, setHoveringOverTitleAndTechStack] =
    useState(false);
  const [pressingDownOnTitleAndTechStack, setPressingDownOnTitleAndTechStack] =
    useState(false);

  const [
    heightOfTitleAndTechStackContainer,
    setHeightOfTitleAndTechStackContainer,
  ] = useState(80);
  const [heightOfInnerBodyContainer, setHeightOfInnerBodyContainer] =
    useState(0);

  const projectOuterContainerRef = useRef<HTMLDivElement>(null);
  const projectInnerContainerRef = useRef<HTMLDivElement>(null);

  if (
    projectNumber !== projectNumberBeingShownCurrently &&
    backgroundPositionX !== "100%" &&
    !hoveringOverTitleAndTechStack
  ) {
    setBackgroundPositionX("100%");
  } else if (
    projectNumber === projectNumberBeingShownCurrently &&
    backgroundPositionX !== "50%" &&
    !hoveringOverTitleAndTechStack
  ) {
    setBackgroundPositionX("50%");
  }

  useLayoutEffect(() => {
    function resizeHandler() {
      if (window.innerWidth < 900) {
        setHeightOfTitleAndTechStackContainer(120);
      } else {
        setHeightOfTitleAndTechStackContainer(80);
      }

      setHeightOfInnerBodyContainer(
        projectInnerContainerRef.current?.getBoundingClientRect().height ?? 80
      );
    }

    // delay to allow for the project to load fully before getting the height of
    // the inner body container
    setTimeout(() => {
      resizeHandler();
    }, 1000);

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <article
      id={`project${projectNumber}`}
      ref={projectOuterContainerRef}
      className={classes.smoothBoxShadowWrapper}
    >
      <div
        style={{
          height:
            projectNumber === projectNumberBeingShownCurrently
              ? `${heightOfInnerBodyContainer}px`
              : heightOfTitleAndTechStackContainer + "px",
        }}
        className={`${classes.parentRelativeContainer} ${
          slideInFromLeft ? "hiddenLeft" : "hiddenRight"
        }`}
      >
        {/* Title and tech stack */}
        <div
          style={{
            cursor: "pointer",
            boxShadow:
              projectNumber === projectNumberBeingShownCurrently
                ? "0 5px 5px rgba(0, 0, 0, 0.3)"
                : "0 1px 1px rgba(0, 0, 0, 0.3)",
            backgroundPositionX: backgroundPositionX,
            filter: pressingDownOnTitleAndTechStack
              ? "brightness(0.9)"
              : "none",
          }}
          className={classes.titleAndTechStackContainer}
          onMouseEnter={() => {
            if (projectNumber === projectNumberBeingShownCurrently) {
              setBackgroundPositionX("0%");
            } else {
              setBackgroundPositionX("50%");
            }

            setHoveringOverTitleAndTechStack(true);
          }}
          onMouseLeave={() => {
            if (projectNumber === projectNumberBeingShownCurrently) {
              setBackgroundPositionX("50%");
            } else {
              setBackgroundPositionX("100%");
            }

            setHoveringOverTitleAndTechStack(false);
            setPressingDownOnTitleAndTechStack(false);
          }}
          onMouseDown={() => {
            if (projectNumber === projectNumberBeingShownCurrently) {
              setBackgroundPositionX("0%");
            } else {
              setBackgroundPositionX("50%");
            }

            setPressingDownOnTitleAndTechStack(true);
          }}
          onMouseUp={() => {
            if (projectNumber === projectNumberBeingShownCurrently) {
              setBackgroundPositionX("50%");
            } else {
              setBackgroundPositionX("100%");
            }

            setPressingDownOnTitleAndTechStack(false);
          }}
          onClick={() => {
            const element = document.getElementById(
              `project${projectNumberBeingShownCurrently}`
            );
            if (element && projectNumberBeingShownCurrently < projectNumber) {
              element.scrollIntoView({
                behavior: "smooth",
              });
            }

            setTimeout(() => {
              setProjectNumberBeingShownCurrently(
                projectNumber !== projectNumberBeingShownCurrently
                  ? projectNumber
                  : -1
              );
            }, 250);

            // scroll to top of one that is being opened
            setTimeout(() => {
              projectOuterContainerRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }, 500);
          }}
        >
          <a
            className={classes.projectTitle}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
            <img
              style={{ width: "1rem", height: "1rem" }}
              src={externalLink}
              alt={"external link icon"}
            ></img>
          </a>

          <div className={classes.techStackContainer}>
            <div className={`${classes.techIcons} baseFlex`}>
              {technologies.map((tech) => (
                <img
                  key={tech.altText}
                  className={"icon"}
                  src={tech.imageLocation}
                  title={tech.altText}
                  alt={tech.altText}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Inner sliding body */}
        <div
          ref={projectInnerContainerRef}
          className={`${
            slideInFromLeft
              ? classes.projectContainer
              : classes.reversedProjectContainer
          }`}
        >
          <div className={classes.description}>{description}</div>

          <div className={classes.whatILearnedAndChallenges}>
            <div className={classes.toggleContainer}>
              <div
                style={{
                  transform: showWhatILearned
                    ? "translateX(0)"
                    : "translateX(100%)",
                }}
                className={classes.toggleIndicator}
              ></div>
              <div
                style={{
                  cursor: showWhatILearned ? "default" : "pointer",
                  color: showWhatILearned ? "hsl(0 0% 95%)" : "inherit",
                  textShadow: showWhatILearned
                    ? "1px 1px 7px #00000096"
                    : "none",
                }}
                className={classes.toggleText}
                onClick={() => setShowWhatILearned(true)}
              >
                What I learned
              </div>
              <div
                style={{
                  cursor: !showWhatILearned ? "default" : "pointer",
                  color: !showWhatILearned ? "hsl(0 0% 95%)" : "inherit",
                  textShadow: !showWhatILearned
                    ? "1px 1px 7px #00000096"
                    : "none",
                }}
                className={classes.toggleText}
                onClick={() => setShowWhatILearned(false)}
              >
                Challenges
              </div>
            </div>

            <div className={classes.relativeWrapper}>
              <div
                style={{
                  position: "relative",
                  transform: showWhatILearned
                    ? "translateX(0)"
                    : "translateX(-15%)",
                  opacity: showWhatILearned ? 1 : 0,
                }}
                className={classes.toggleContent}
              >
                <ul>
                  {whatILearned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  position: "absolute",
                  transform: showWhatILearned
                    ? "translateX(15%)"
                    : "translateX(0)",
                  opacity: !showWhatILearned ? 1 : 0,
                }}
                className={classes.toggleContent}
              >
                <ul>
                  {challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`${classes.projectImageContainer} baseVertFlex`}>
            <img
              className={classes.projectImage}
              src={screenshotLink}
              alt={screenshotAltText}
              onClick={() => {
                openInNewTab(link);
              }}
            />
            <img
              className={classes.githubIcon}
              src={smallLightGithubIcon}
              alt={"Github"}
              onClick={() => {
                openInNewTab(githubRepoLink);
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Project;
