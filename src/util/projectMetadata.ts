import { type IProject } from "../components/projects/Project";

import reactIcon from "../assets/react.png";
import firebaseIcon from "../assets/firebase.png";
import auth0Icon from "../assets/auth0.png";
import nodeJSIcon from "../assets/nodejs.png";
import gitIcon from "../assets/git.png";
import typeScriptIcon from "../assets/typescript.png";
import nextIcon from "../assets/nextjs.svg";
import trpcIcon from "../assets/trpc.svg";
import prismaIcon from "../assets/prisma.svg";
import postgresIcon from "../assets/postgresql.svg";
import tailwindIcon from "../assets/tailwind.svg";
import mongoDBIcon from "../assets/mongodb.png";
import socketIOIcon from "../assets/socketio.svg";
import jestIcon from "../assets/jest.png";
import viteIcon from "../assets/vite.png";
import html5Icon from "../assets/html5.png";
import css3Icon from "../assets/css3.png";

export const projectMetadata: IProject[] = [
  {
    title: "Squeak",
    link: "https://playsqueak.com/",
    whatILearned: [
      "How to work with websockets through the Socket.IO library, especially within NextJS's API routes.",
      "How to implement a friends list that utilizes websockets and also persists the data in a database. Also how to implement browser notifications to notify the user when they receive an invite.",
      "Streamlining emit handlers by modularizing them into hooks, freeing components from complex logic.",
    ],
    challenges: [
      "Handling the extensive amount of edge cases and cleanup that come with a real-time multiplayer game.",
      "Refactoring the structure of the emits between the client and server to be more efficient and scalable.",
      `Trying to support as small of a viewport as possible when designing the UI where every player can still see the same amount of content.`,
    ],
    technologies: [
      {
        imageLocation: typeScriptIcon,
        altText: "TypeScript",
      },
      {
        imageLocation: nextIcon,
        altText: "NextJS",
      },
      {
        imageLocation: trpcIcon,
        altText: "tRPC",
      },
      {
        imageLocation: prismaIcon,
        altText: "Prisma",
      },
      {
        imageLocation: postgresIcon,
        altText: "PostgreSQL",
      },
      {
        imageLocation: tailwindIcon,
        altText: "TailwindCSS",
      },
      {
        imageLocation: socketIOIcon,
        altText: "Socket.IO",
      },
    ],
    screenshotLink: "https://i.imgur.com/EpwvpXH.png",
    screenshotAltText:
      "A screenshot of Squeak, a realtime multiplayer card game that I built with the T3 + Socket.IO stack.",
    githubRepoLink: "https://github.com/michaelongaro/Squeak",
    slideInFromLeft: true,
  },
  {
    title: "Drawing Dash",
    link: "https://drawingdash.com/",
    whatILearned: [
      "React + Firebase + Auth0 stack. How to design a full-stack application that is both secure and feature rich.",
      "React's built-in context management system along with canvas manipulation techniques.",
      "UI/UX + Responsive design fundamentals.",
    ],
    challenges: [
      "React's learning curve was quite a struggle coming from vanilla JS.",
      "Logic and rendering of suspense states + structuring Firebase schema + fine-tuning animations.",
      "Implementing the paintbucket tool, touch support, and allowing the user to keep drawing if their mouse left the canvas.",
    ],
    technologies: [
      {
        imageLocation: reactIcon,
        altText: "React",
      },
      {
        imageLocation: firebaseIcon,
        altText: "Firebase",
      },
      {
        imageLocation: auth0Icon,
        altText: "Auth0",
      },

      {
        imageLocation: nodeJSIcon,
        altText: "NodeJS",
      },
    ],
    screenshotLink: "https://i.gyazo.com/961e9be0427c8298ca89b5b19a85d239.png",
    screenshotAltText:
      "A screenshot of Drawing Dash, a drawing game that I built with the React + Firebase + Auth0 stack.",
    githubRepoLink: "https://github.com/michaelongaro/DrawingDash",
    slideInFromLeft: false,
  },
  {
    title: "Stash",
    link: "https://stash-xi.vercel.app/",
    whatILearned: [
      "How and why you would want to implement optimistic fetching. Basic cache fundamentals with tRPC.",
      "How to quickly prototype out a design with Tailwind, including custom + responsive classes. Also I feel much more confident with CSS Grid, since it was the cornerstone of most modals.",
      "How to design a PostgreSQL schema within Prisma to be concise and scalable.",
    ],
    challenges: [
      "Despite the T3 stack handling some folder scaffolding for me, understanding how each technology interacted with one another took a great deal of research.",
      "Creating a tRPC API route that fetches a low resolution blurred placeholder for the image being requested.",
      "Custom responsive styling for the image editor and slideshow components.",
    ],
    technologies: [
      {
        imageLocation: typeScriptIcon,
        altText: "TypeScript",
      },
      {
        imageLocation: nextIcon,
        altText: "NextJS",
      },
      {
        imageLocation: trpcIcon,
        altText: "rRPC",
      },
      {
        imageLocation: prismaIcon,
        altText: "Prisma",
      },

      {
        imageLocation: postgresIcon,
        altText: "PostgreSQL",
      },
      {
        imageLocation: tailwindIcon,
        altText: "TailwindCSS",
      },
    ],
    screenshotLink: "https://i.gyazo.com/b82af8a596e46e6688c24a99cdc3b0e0.jpg",
    screenshotAltText:
      "A screenshot of Stash, an image hosting site that I built with the T3 stack.",
    githubRepoLink: "https://github.com/michaelongaro/stash",
    slideInFromLeft: true,
  },
  {
    title: "Lyricize",
    link: "https://lyricize-app.herokuapp.com/",
    whatILearned: [
      "How to communicate between the frontend and backend with the MERN stack. Making certain axios calls within custom hooks for code readability.",
      "How to use MongoDB (with mongoose) to achieve basic CRUD functionality. Pros and cons of a non-relational database.",
      `How to tweak an installed npm package and keep the changes in production with the "patch-package" library.`,
    ],
    challenges: [
      "Testing various lyric-fetching npm packages to find one that fit the project's needs.",
      "Sanitizing the fetched lyric data by remove any extraneous metadata, punctuation, and variable whitespace with RegEx.",
      "Splitting up the API requests into smaller sizes to avoid Heroku's 30 second maximum timeout for HTTP requests.",
    ],
    technologies: [
      {
        imageLocation: reactIcon,
        altText: "React",
      },
      {
        imageLocation: nodeJSIcon,
        altText: "NodeJS",
      },
      {
        imageLocation: mongoDBIcon,
        altText: "MongoDB",
      },
      {
        imageLocation: typeScriptIcon,
        altText: "TypeScript",
      },
      {
        imageLocation: jestIcon,
        altText: "Jest",
      },
      {
        imageLocation: viteIcon,
        altText: "Vite",
      },
    ],
    screenshotLink: "https://i.gyazo.com/b48c4d7bf04f4f4e1b61ef574dc6ab42.png",
    screenshotAltText:
      "A screenshot of Lyricize, a Spotify lyric visualizer app that I built with the MERN stack.",
    githubRepoLink: "https://github.com/michaelongaro/Lyricize",
    slideInFromLeft: false,
  },
  {
    title: "Universal Forecast",
    link: "https://michaelongaro.github.io/UniversalForecast/",
    whatILearned: [
      "Vanilla TypeScript and the value of splitting code up into small, reusable functions.",
      "The Fetch API and how to properly retrieve data from an API.",
      "How to handle custom keyboard navigation through a dropdown list.",
    ],
    challenges: [
      "DOM manipulation while trying to keep DRY code.",
      "Targeting nested elements from a JSON response and creating an interface for the data.",
      "Creating a layout that is visually pleasing and informative while conforming to the API's restrictions.",
    ],
    technologies: [
      {
        imageLocation: html5Icon,
        altText: "HTML5",
      },
      {
        imageLocation: css3Icon,
        altText: "CSS3",
      },
      {
        imageLocation: typeScriptIcon,
        altText: "TypeScript",
      },
      {
        imageLocation: viteIcon,
        altText: "Vite",
      },
    ],
    screenshotLink: "https://i.gyazo.com/0de8e5b002d91c85dd1cad84ac3c25ec.png",
    screenshotAltText:
      "A screenshot of Universal Forecast, a weather app that I built with vanilla TypeScript.",
    githubRepoLink: "https://github.com/michaelongaro/UniversalForecast",
    slideInFromLeft: true,
  },
];
