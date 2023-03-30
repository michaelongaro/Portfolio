import openInNewTab from "../../util/openInNewTab";

import smallLightGithubIcon from "../../assets/smallLightGithubLogo.png";

import classes from "./Project.module.css";

export interface IProject {
  title: string;
  link: string;
  whatILearned: string[];
  challenges: string[];
  technologies: ITechnology[];
  screenshotLink: string;
  screenshotAltText: string;
  githubRepoLink: string;
  slideInFromLeft: boolean;
}

interface ITechnology {
  imageLocation: string;
  altText: string;
}

function Project({
  title,
  link,
  whatILearned,
  challenges,
  technologies,
  screenshotLink,
  screenshotAltText,
  githubRepoLink,
  slideInFromLeft,
}: IProject) {
  return (
    <article
      className={`${
        slideInFromLeft
          ? classes.projectContainer
          : classes.reversedProjectContainer
      } ${slideInFromLeft ? "hiddenLeft" : "hiddenRight"}`}
    >
      <div className={`${classes.projectTitleContainer} baseVertFlex`}>
        <a
          className={classes.projectTitle}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>

        <div className={`${classes.techIcons} baseFlex`}>
          {technologies.map((tech) => (
            <img
              className={"icon"}
              src={tech.imageLocation}
              title={tech.altText}
              alt={tech.altText}
            />
          ))}
        </div>
      </div>

      <div className={classes.whatILearned}>
        <div className={classes.underlinedHeader}>What I learned</div>
        <ul>
          {whatILearned.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      <div className={classes.challenges}>
        <div className={classes.underlinedHeader}>Challenges</div>
        <ul>
          {challenges.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      <div className={`${classes.projectImageContainer} baseVertFlex`}>
        <img
          className={classes.projectImage}
          src={screenshotLink}
          alt={screenshotAltText}
          loading={"lazy"}
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
    </article>
  );
}

export default Project;
