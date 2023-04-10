import { useState } from "react";
import { type IProject } from "../components/projects/Project";

import squeakImage from "../assets/promoImages/squeak.png";
import drawingDashImage from "../assets/promoImages/drawingDash.png";
import stashImage from "../assets/promoImages/stash.jpg";
import lyricizeImage from "../assets/promoImages/lyricize.png";
import universalForecastImage from "../assets/promoImages/universalForecast.png";

import reactIcon from "../assets/react.png";
import firebaseIcon from "../assets/firebase.png";
import auth0Icon from "../assets/auth0.png";
import nodeJSIcon from "../assets/nodejs.png";
import typeScriptIcon from "../assets/typescript.png";
import nextIcon from "../assets/nextjs.svg";
import trpcIcon from "../assets/trpc.svg";
import prismaIcon from "../assets/prisma.svg";
import postgresIcon from "../assets/postgresql.svg";
import tailwindIcon from "../assets/tailwind.svg";
import mongoDBIcon from "../assets/mongodb.png";
import sassIcon from "../assets/sass.svg";
import socketIOIcon from "../assets/socketio.svg";
import jestIcon from "../assets/jest.png";
import viteIcon from "../assets/vite.png";
import html5Icon from "../assets/html5.png";
import css3Icon from "../assets/css3.png";

function useProjectMetadata() {
  const [
    projectNumberBeingShownCurrently,
    setProjectNumberBeingShownCurrently,
  ] = useState(0);

  const projectMetadata: IProject[] = [
    {
      title: "Squeak",
      link: "https://playsqueak.com/",
      description:
        "Squeak is a realtime multiplayer card game based on the game Nerts. Players can create their own room or join from a list of public rooms. A comprehensive tutorial is provided for new players to learn how to play. If a player signs up they can add friends and their in-game stats will be recorded in the global leaderboard.",
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
      screenshotLink: squeakImage,
      screenshotAltText:
        "A screenshot of Squeak, a realtime multiplayer card game that I built with the T3 + Socket.IO stack.",
      githubRepoLink: "https://github.com/michaelongaro/Squeak",
      slideInFromLeft: true,
      projectNumber: 0,
      projectNumberBeingShownCurrently,
      setProjectNumberBeingShownCurrently,
    },
    {
      title: "Drawing Dash",
      link: "https://drawingdash.com/",
      description:
        "Drawing Dash is a drawing app designed for artists to challenge their creativity with daily randomized prompts. There is full search functionality for both drawings and artist profiles. Registered artists can pin their favorite drawings to their profile, update their status and customize their profile picture. The most liked drawings from the previous day are featured on the homepage.",
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
      screenshotLink: drawingDashImage,
      screenshotAltText:
        "A screenshot of Drawing Dash, a drawing game that I built with the React + Firebase + Auth0 stack.",
      githubRepoLink: "https://github.com/michaelongaro/DrawingDash",
      slideInFromLeft: false,
      projectNumber: 1,
      projectNumberBeingShownCurrently,
      setProjectNumberBeingShownCurrently,
    },
    {
      title: "Stash",
      link: "https://stash-xi.vercel.app/",
      description:
        "Stash is an image repository that allows users to upload, edit, and share their images. Multiple images can be uploaded at once and users can create folders for organization. Blurred low resoluation placeholders are generated for each image and are shown until the full resolution image is loaded.",
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
      screenshotLink: stashImage,
      screenshotAltText:
        "A screenshot of Stash, an image hosting site that I built with the T3 stack.",
      githubRepoLink: "https://github.com/michaelongaro/stash",
      slideInFromLeft: true,
      projectNumber: 2,
      projectNumberBeingShownCurrently,
      setProjectNumberBeingShownCurrently,
    },
    {
      title: "Lyricize",
      link: "https://lyricize-app.herokuapp.com/",
      description:
        "Lyricize is lyric occurance visualizer tailored for your liked songs on Spotify. Lyrics can be viewed either with an interactive bubble map or a user-friendly list format, and offers the flexibility to filter results based on word length. Users can share their profile page and compare their lyrical insights with the collective data of fellow Lyricize users.",
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
          imageLocation: sassIcon,
          altText: "Sass",
        },
        {
          imageLocation: viteIcon,
          altText: "Vite",
        },
      ],
      screenshotLink: lyricizeImage,
      screenshotAltText:
        "A screenshot of Lyricize, a Spotify lyric visualizer app that I built with the MERN stack.",
      githubRepoLink: "https://github.com/michaelongaro/Lyricize",
      slideInFromLeft: false,
      projectNumber: 3,
      projectNumberBeingShownCurrently,
      setProjectNumberBeingShownCurrently,
    },
    {
      title: "Universal Forecast",
      link: "https://michaelongaro.github.io/UniversalForecast/",
      description: `Universal Forecast is a weather app that allows users to search for the weather in any city in the world. The background dynamically changes to the average temperature of the location entered. The autofill search results are fully keyboard navitgatable, and there is the option to use the user's current location.`,
      whatILearned: [
        "Vanilla TypeScript and the value of splitting code up into small, reusable functions.",
        "The Fetch API and how to properly retrieve data from an API.",
        "How to handle custom keyboard navigation through a dropdown list.",
      ],
      challenges: [
        "Manipulation of the DOM while trying to maintain DRY principles.",
        "Targeting nested elements from a JSON response and creating an interface for the data.",
        "Creating a layout that is visually pleasing and informative while conforming to the restrictions of the API.",
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
      screenshotLink: universalForecastImage,
      screenshotAltText:
        "A screenshot of Universal Forecast, a weather app that I built with vanilla TypeScript.",
      githubRepoLink: "https://github.com/michaelongaro/UniversalForecast",
      slideInFromLeft: true,
      projectNumber: 4,
      projectNumberBeingShownCurrently,
      setProjectNumberBeingShownCurrently,
    },
  ];

  return projectMetadata;
}

export default useProjectMetadata;
