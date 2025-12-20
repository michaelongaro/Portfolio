import { type IProject } from "../components/projects/Project";

import khuesKitchenImage from "/assets/promoImages/khuesKitchen.png";
import autostrumImage from "/assets/promoImages/autostrum.png";
import squeakImage from "/assets/promoImages/squeak.png";
import drawingDashImage from "/assets/promoImages/drawingDash.png";
import stashImage from "/assets/promoImages/stash.jpg";
import lyricizeImage from "/assets/promoImages/lyricize.png";
import universalForecastImage from "/assets/promoImages/universalForecast.png";

import reactIcon from "/assets/react.png";
import firebaseIcon from "/assets/firebase.png";
import auth0Icon from "/assets/auth0.png";
import nodeJSIcon from "/assets/nodejs.png";
import typeScriptIcon from "/assets/typescript.png";
import nextIcon from "/assets/nextjs.svg";
import trpcIcon from "/assets/trpc.svg";
import prismaIcon from "/assets/prisma.svg";
import postgresIcon from "/assets/postgresql.svg";
import tailwindIcon from "/assets/tailwind.svg";
import mongoDBIcon from "/assets/mongodb.png";
import sassIcon from "/assets/sass.svg";
import playwrightIcon from "/assets/playwright.svg";
import socketIOIcon from "/assets/socketio.svg";
import jestIcon from "/assets/jest.png";
import viteIcon from "/assets/vite.svg";
import html5Icon from "/assets/html5.png";
import css3Icon from "/assets/css3.png";
import javaScriptIcon from "/assets/javascript.png";
import awsIcon from "/assets/awsS3.svg";

function useProjectMetadata() {
  const projectMetadata: IProject[] = [
    {
      title: "Khue's Kitchen",
      link: "https://khueskitchen.com/",
      description:
        "A custom full-stack e-commerce solution built for a local restaurant to streamline online ordering and customer retention. The platform features a dynamic menu, a custom-built rewards program, and a comprehensive administrative suite. It includes real-time order tracking and business analytics to help the restaurant manage daily operations and monitor growth trends efficiently.",
      whatILearned: [
        "How to integrate the Stripe API to securely handle multi-step payment flows and manage complex transaction states.",
        "Designing and implementing automated transactional email systems and marketing workflows using the Resend API.",
        "Building advanced administrative dashboards that transform raw database entries into actionable real-time business analytics.",
      ],
      challenges: [
        "Synchronizing real-time order status updates between the kitchen's admin panel and the customer's front-end interface.",
        "Architecting a flexible relational database schema to support dynamic menu items with various modifiers and pricing tiers.",
        "Maintaining high system availability (99.9% uptime) while deploying frequent feature enhancements and critical security patches.",
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
        {
          imageLocation: playwrightIcon,
          altText: "Playwright",
        },
      ],
      screenshotLink: khuesKitchenImage,
      screenshotAltText:
        "A screenshot of Khue's, a new restaurant in St. Paul, Minnesota that I built with the T3 stack.",
      type: "Professional",
      startDate: "Jan 2024",
      endDate: "Present",
    },
    {
      title: "Autostrum",
      link: "https://autostrum.com/",
      description:
        "Autostrum is a platform for guitar players to create, share, and practice guitar tabs. It comes with a highly interactive editor equipped with keyboard shortcuts to reduce repetitive actions. Every tab is able to be programmatically played back using real guitar audio samples. Playback speed and the looping range can be tweaked for easier practice.",
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
        {
          imageLocation: playwrightIcon,
          altText: "Playwright",
        },
      ],
      screenshotLink: autostrumImage,
      screenshotAltText:
        "A screenshot of Autostrum, a guitar tab creator that I built with the T3 stack.",
      githubRepoLink: "https://github.com/michaelongaro/Autostrum",
      type: "Personal",
      startDate: "Apr 2023",
      endDate: "Present",
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
      type: "Personal",
      startDate: "Dec 2022",
      endDate: "Present",
    },
    {
      title: "Stash",
      description:
        "Stash is an image repository designed for seamless media management. It enables users to perform bulk uploads, organize content into custom folders, and share assets effortlessly. To ensure a premium user experience, the application utilizes a 'blur-up' loading technique, generating low-resolution placeholders that serve as immediate visual feedback while full-resolution images load in the background.",
      whatILearned: [
        "How and why you would want to implement optimistic fetching. Basic cache fundamentals with tRPC.",
        "How to quickly prototype out a design with Tailwind, including custom + responsive classes. Also I feel much more confident with CSS Grid, since it was the cornerstone of most modals.",
        "How to design a PostgreSQL schema within Prisma to be concise and scalable.",
      ],
      challenges: [
        "Implementing a secure file upload system that prevents malicious files from being uploaded.",
        "Designing a scalable database schema that can handle a large number of users and assets.",
        "Creating a tRPC API route that fetches a low resolution blurred placeholder for the image being requested.",
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
          imageLocation: nodeJSIcon,
          altText: "NodeJS",
        },
        {
          imageLocation: postgresIcon,
          altText: "PostgreSQL",
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
      type: "Personal",
      startDate: "Nov 2022",
      endDate: "Dec 2022",
    },
    {
      title: "Lyricize",
      description:
        "Lyricize is a data visualization tool that aggregates lyrics from your Spotify liked songs. It features an interactive bubble map where bubble size corresponds to word frequency, along with customizable list views and word-length filters. Users can also participate in a global leaderboard to see how their lyrical trends compare to the rest of the world.",
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
          imageLocation: typeScriptIcon,
          altText: "TypeScript",
        },
        {
          imageLocation: reactIcon,
          altText: "React",
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
          imageLocation: jestIcon,
          altText: "Jest",
        },
      ],
      screenshotLink: lyricizeImage,
      screenshotAltText:
        "A screenshot of Lyricize, a lyrics search application that I built with React and Auth0.",
      githubRepoLink: "https://github.com/michaelongaro/Lyricize",
      type: "Personal",
      startDate: "Oct 2022",
      endDate: "Mar 2023",
    },
    {
      title: "Universal Forecast",
      description:
        "Universal Forecast is a weather application that provides users with accurate weather forecasts for any location in the world. The application uses the OpenWeatherMap API to retrieve weather data. Users can also view detailed weather information such as humidity, wind speed, and pressure.",
      whatILearned: [
        "TypeScript fundamentals and the value of splitting code up into small, reusable functions.",
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
        "A screenshot of Universal Forecast, a weather application that I built with HTML, CSS, and JavaScript.",
      githubRepoLink: "https://github.com/michaelongaro/UniversalForecast",
      type: "Personal",
      startDate: "Sep 2022",
      endDate: "Nov 2022",
    },
    {
      title: "Drawing Dash",
      description:
        "Drawing Dash is a drawing game where players are given a set of daily random prompts and must draw them within a given time limit. Players can then share and vote on their favorite drawings. The game features an advanced custom drawing canvas with various tools and colors.",
      whatILearned: [
        "React, Firebase, and Auth0 stack. How to design a full-stack application that is both secure and feature rich.",
        "React's built-in context management system along with canvas manipulation techniques.",
        "UI/UX and responsive design fundamentals.",
      ],
      challenges: [
        "React's learning curve was quite a struggle coming from vanilla JavaScript.",
        "Logic and rendering of suspense states, structuring Firebase schema, and fine-tuning animations.",
        "Implementing the paintbucket tool, touch support, and allowing the user to keep drawing if their mouse left the canvas.",
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
          imageLocation: firebaseIcon,
          altText: "Firebase",
        },
        {
          imageLocation: auth0Icon,
          altText: "Auth0",
        },
      ],
      screenshotLink: drawingDashImage,
      screenshotAltText:
        "A screenshot of Drawing Dash, a drawing game that I built with React and Firebase.",
      githubRepoLink: "https://github.com/michaelongaro/DrawingDash",
      type: "Personal",
      startDate: "Nov 2021",
      endDate: "Jul 2023",
    },
  ];

  return projectMetadata;
}

export default useProjectMetadata;
