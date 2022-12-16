import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";
import anime from "animejs";

import html5Icon from "../../assets/html5.png";
import css3Icon from "../../assets/css3.png";
import javaScriptIcon from "../../assets/javascript.png";
import typeScriptIcon from "../../assets/typescript.png";
import auth0Icon from "../../assets/auth0.png";
import reactIcon from "../../assets/react.png";
import mongoDBIcon from "../../assets/mongodb.png";
import firebaseIcon from "../../assets/firebase.png";
import nodeJSIcon from "../../assets/nodejs.png";
import jestIcon from "../../assets/jest.png";
import gitIcon from "../../assets/git.png";
import viteIcon from "../../assets/vite.png";
import postgresIcon from "../../assets/postgresql.svg";
import nextIcon from "../../assets/nextjs.svg";
import trpcIcon from "../../assets/trpc.svg";
import prismaIcon from "../../assets/prisma.svg";
import tailwindIcon from "../../assets/tailwind.svg";
import graphQLIcon from "../../assets/graphql.png";

import classes from "./Skills.module.css";
import "../../index.css";

function Skills(props: any) {
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
        delay: anime.stagger(200, { grid: [6, 2], from: "first" }),
      });

      anime({
        targets: "#currentlyLearning",
        opacity: [0, 1],
        duration: 1000,
        delay: 1150,
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
        <img
          className={"icon"}
          src={html5Icon}
          title={"HTML 5"}
          alt={"HTML 5"}
        />
        <img className={"icon"} src={css3Icon} title={"CSS 3"} alt={"CSS 3"} />
        <img
          className={"icon"}
          src={javaScriptIcon}
          title={"JavaScipt"}
          alt={"JavaScript"}
        />
        <img
          className={"icon"}
          src={typeScriptIcon}
          title={"TypeScipt"}
          alt={"TypeScript"}
        />
        <img className={"icon"} src={reactIcon} title={"React"} alt={"React"} />
        <img
          className={"icon"}
          src={nextIcon}
          title={"NextJS"}
          alt={"NextJS"}
        />
        <img className={"icon"} src={trpcIcon} title={"TRPC"} alt={"TRPC"} />
        <img
          className={"icon"}
          src={prismaIcon}
          title={"Prisma"}
          alt={"Prisma"}
        />
        <img
          className={"icon"}
          src={tailwindIcon}
          title={"TailwindCSS"}
          alt={"TailwindCSS"}
        />
        <img
          className={"icon"}
          src={nodeJSIcon}
          title={"NodeJS"}
          alt={"NodeJS"}
        />
        <img
          className={"icon"}
          src={mongoDBIcon}
          title={"MongoDB"}
          alt={"MongoDB"}
        />
        <img
          className={"icon"}
          src={postgresIcon}
          title={"PostgreSQL"}
          alt={"PostgreSQL"}
        />
        <img className={"icon"} src={jestIcon} title={"Jest"} alt={"Jest"} />
        <img
          className={"icon"}
          src={firebaseIcon}
          title={"Firebase"}
          alt={"Firebase"}
        />
        <img className={"icon"} src={auth0Icon} title={"Auth0"} alt={"Auth0"} />
        <img className={"icon"} src={viteIcon} title={"Vite"} alt={"Vite"} />
        <img className={"icon"} src={gitIcon} title={"Git"} alt={"Git"} />
      </div>

      <div
        style={{ gap: "1rem" }}
        className={`${classes.currentlyLearning} baseFlex`}
      >
        Currently learning:
        <img
          id="currentlyLearning"
          className={"icon"}
          src={graphQLIcon}
          alt={"GraphQL"}
        />
      </div>
    </div>
  );
}

export default Skills;
