import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import anime from "animejs";

import html5Icon from "../../assets/html5.png";
import css3Icon from "../../assets/css3.png";
import javaScriptIcon from "../../assets/javascript.png";
import typeScriptIcon from "../../assets/typescript.png";
import reactIcon from "../../assets/react.png";
import mongoDBIcon from "../../assets/mongodb.png";
import firebaseIcon from "../../assets/firebase.png";
import nodeJSIcon from "../../assets/nodejs.png";
import jestIcon from "../../assets/jest.png";
import gitIcon from "../../assets/git.png";
import viteIcon from "../../assets/vite.png";
import socketIOIcon from "../../assets/socketio.svg";
import postgresIcon from "../../assets/postgresql.svg";
import sassIcon from "../../assets/sass.svg";
import nextIcon from "../../assets/nextjs.svg";
import trpcIcon from "../../assets/trpc.svg";
import prismaIcon from "../../assets/prisma.svg";
import tailwindIcon from "../../assets/tailwind.svg";
import reactTestingLibraryIcon from "../../assets/reactTestingLibrary.png";
import threeJSIcon from "../../assets/threejs.svg";
import awsIcon from "../../assets/awsS3.svg";

const skills = [
  { src: html5Icon, title: "HTML 5" },
  { src: css3Icon, title: "CSS 3" },
  { src: javaScriptIcon, title: "JavaScript" },
  { src: typeScriptIcon, title: "TypeScript" },
  { src: reactIcon, title: "React" },
  { src: nextIcon, title: "NextJS" },
  { src: trpcIcon, title: "tRPC" },
  { src: nodeJSIcon, title: "NodeJS" },
  { src: prismaIcon, title: "Prisma" },
  { src: postgresIcon, title: "PostgreSQL" },
  { src: mongoDBIcon, title: "MongoDB" },
  { src: firebaseIcon, title: "Firebase" },
  { src: awsIcon, title: "AWS S3" },
  { src: tailwindIcon, title: "Tailwind CSS" },
  { src: sassIcon, title: "Sass" },
  { src: threeJSIcon, title: "ThreeJS" },
  { src: socketIOIcon, title: "Socket.io" },
  { src: viteIcon, title: "Vite" },
  { src: jestIcon, title: "Jest" },
  { src: reactTestingLibraryIcon, title: "RTL" },
  { src: gitIcon, title: "Git" },
];

function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      anime({
        targets: ".skill-icon",
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        easing: "easeOutQuad",
      });
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      id="skills"
      className="py-20 w-full max-w-3xl scroll-mt-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-500 after:mt-2 after:rounded-full">
          Skills
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-8 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-icon opacity-0 flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-white border dark:border-slate-700 dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
              <img
                src={skill.src}
                alt={skill.title}
                title={skill.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6 whitespace-nowrap">
              {skill.title}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
        <p>
          Currently learning:{" "}
          <span className="font-semibold text-blue-500">Rust</span>
        </p>
      </div>
    </section>
  );
}

export default Skills;
