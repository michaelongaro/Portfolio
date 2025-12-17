import { type IProject } from "../components/projects/Project";

import autostrumImage from "../assets/promoImages/autostrum.png";
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
import javaScriptIcon from "../assets/javascript.png";
import awsIcon from "../assets/awsS3.svg";

function useProjectMetadata() {
  const projectMetadata: IProject[] = [
    {
      title: "Autostrum",
      link: "https://autostrum.com/",
      description:
        "Autostrum is a platform for guitar players to create, share, and practice guitar tabs. It comes with a highly interactive editor equipped with keyboard shortcuts to reduce repetitive actions. Every tab is able to be programmatically played back using real guitar audio samples. Playback speed and the looping range can be modified for easier practice. Alternatively artists can directly record their playthrough of the tab.",
      whatILearned: [
        "How to create a 'compiler' for the generated audio, as well as extensive usage of the Web Audio API.",
        "How to properly GET and POST files to an AWS S3 bucket using pre-signed URLs for increased security.",
        "How to use a component UI library (shadcn/ui) to build a cohesive, seamless, and responsive design.",
      ],
      challenges: [
        "Manipulating the raw guitar audio samples to emulate different effects (e.g. slides, hammer-ons, pull-offs, etc.)",
        "How to utilize the devtools profiler to pinpoint performance bottlenecks, and how to correctly memoize components in React.",
        "Refactoring a significant portion of the codebase in response to the scope/capabilities of the project expanding.",
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
          imageLocation: awsIcon,
          altText: "AWS S3",
        },
      ],
      screenshotLink: autostrumImage,
      screenshotAltText:
        "A screenshot of Autostrum, a guitar tab creator that I built with the T3 stack.",
      githubRepoLink: "https://github.com/michaelongaro/Autostrum",
      slideInFromLeft: true,
      projectNumber: 0,
    },
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
        "Handling race conditions that occurred when multiple players interacted with the same card simultaneously.",
        "Designing a responsive layout that accommodates the dense information of a card game while remaining legible on smaller screens.",
        "Ensuring that the game state remained consistent across all clients, even in the presence of network latency.",
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
        "A screenshot of Squeak, a multiplayer card game that I built with the T3 stack.",
      githubRepoLink: "https://github.com/michaelongaro/Squeak",
      slideInFromLeft: false,
      projectNumber: 1,
    },
    {
      title: "Drawing Dash",
      link: "deadLink",
      description:
        "Drawing Dash is a drawing game where players are given a prompt and must draw it within a time limit. Players can then vote on their favorite drawings. The game features a custom drawing canvas with various tools and colors. Players can also create their own custom prompts to play with friends.",
      whatILearned: [
        "How to use the HTML5 Canvas API to create a drawing interface.",
        "How to use Firebase for realtime data synchronization and authentication.",
        "How to use React Router for client-side routing.",
      ],
      challenges: [
        "Optimizing the drawing canvas to ensure smooth performance on mobile devices.",
        "Handling the realtime synchronization of drawing data across multiple clients.",
        "Designing a user interface that is intuitive and easy to use for players of all ages.",
      ],
      technologies: [
        {
          imageLocation: typeScriptIcon,
          altText: "TypeScript",
        },
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
          imageLocation: jestIcon,
          altText: "Jest",
        },
        {
          imageLocation: viteIcon,
          altText: "Vite",
        },
      ],
      screenshotLink: drawingDashImage,
      screenshotAltText:
        "A screenshot of Drawing Dash, a drawing game that I built with React and Firebase.",
      githubRepoLink: "https://github.com/michaelongaro/DrawingDash",
      slideInFromLeft: true,
      projectNumber: 2,
    },
    {
      title: "Stash",
      link: "deadLink",
      description:
        "Stash is a platform for users to store and organize their digital assets. Users can upload files, create folders, and share their assets with others. The platform also features a powerful search engine that allows users to quickly find the assets they are looking for.",
      whatILearned: [
        "How to use AWS S3 for file storage and retrieval.",
        "How to use MongoDB for storing metadata and user information.",
        "How to use ExpressJS to create a RESTful API.",
      ],
      challenges: [
        "Implementing a secure file upload system that prevents malicious files from being uploaded.",
        "Designing a scalable database schema that can handle a large number of users and assets.",
        "Optimizing the search engine to provide fast and accurate results.",
      ],
      technologies: [
        {
          imageLocation: javaScriptIcon,
          altText: "JavaScript",
        },
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
          imageLocation: sassIcon,
          altText: "Sass",
        },
        {
          imageLocation: awsIcon,
          altText: "AWS S3",
        },
      ],
      screenshotLink: stashImage,
      screenshotAltText:
        "A screenshot of Stash, a digital asset management platform that I built with the MERN stack.",
      githubRepoLink: "https://github.com/michaelongaro/Stash",
      slideInFromLeft: false,
      projectNumber: 3,
    },
    {
      title: "Lyricize",
      link: "deadLink",
      description:
        "Lyricize is a web application that allows users to search for lyrics to their favorite songs. The application uses the Genius API to retrieve lyrics and song information. Users can also save their favorite lyrics to their profile for easy access.",
      whatILearned: [
        "How to use third-party APIs to retrieve data.",
        "How to use Auth0 for user authentication.",
        "How to use Jest and React Testing Library for unit testing.",
      ],
      challenges: [
        "Handling rate limits and errors from the Genius API.",
        "Implementing a secure authentication system using Auth0.",
        "Writing comprehensive unit tests to ensure the reliability of the application.",
      ],
      technologies: [
        {
          imageLocation: typeScriptIcon,
          altText: "TypeScript",
        },
        {
          imageLocation: reactIcon,
          altText: "React",
        },
        {
          imageLocation: tailwindIcon,
          altText: "TailwindCSS",
        },
      ],
      screenshotLink: lyricizeImage,
      screenshotAltText:
        "A screenshot of Lyricize, a lyrics search application that I built with React and Auth0.",
      githubRepoLink: "https://github.com/michaelongaro/Lyricize",
      slideInFromLeft: true,
      projectNumber: 4,
    },
    {
      title: "Universal Forecast",
      link: "deadLink",
      description:
        "Universal Forecast is a weather application that provides users with accurate weather forecasts for any location in the world. The application uses the OpenWeatherMap API to retrieve weather data. Users can also view detailed weather information such as humidity, wind speed, and pressure.",
      whatILearned: [
        "How to use the OpenWeatherMap API to retrieve weather data.",
        "How to use the Geolocation API to get the user's current location.",
        "How to use CSS Grid and Flexbox to create a responsive layout.",
      ],
      challenges: [
        "Handling different weather conditions and displaying appropriate icons and backgrounds.",
        "Optimizing the application for mobile devices with limited screen real estate.",
        "Ensuring that the application is accessible to users with disabilities.",
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
          imageLocation: javaScriptIcon,
          altText: "JavaScript",
        },
      ],
      screenshotLink: universalForecastImage,
      screenshotAltText:
        "A screenshot of Universal Forecast, a weather application that I built with HTML, CSS, and JavaScript.",
      githubRepoLink: "https://github.com/michaelongaro/UniversalForecast",
      slideInFromLeft: false,
      projectNumber: 5,
    },
  ];

  return projectMetadata;
}

export default useProjectMetadata;
