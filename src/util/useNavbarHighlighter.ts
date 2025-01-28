import { useEffect, useState } from "react";

import debounce from "debounce";

function useNavbarHighlighter() {
  const [linkStates, setLinkStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const skills = document.getElementById("skills") as HTMLDivElement;
    const projects = document.getElementById("projects") as HTMLDivElement;
    const aboutMe = document.getElementById("aboutme") as HTMLDivElement;
    const contact = document.getElementById("contact") as HTMLDivElement;

    scrollHandler();

    function scrollHandler() {
      const skillsStartHeight =
        skills.getBoundingClientRect().top + window.scrollY - 500;
      const skillsEndHeight =
        skillsStartHeight + skills.getBoundingClientRect().height + 200;

      const projectsStartHeight =
        projects.getBoundingClientRect().top + window.scrollY - 500;
      const projectsEndHeight =
        projectsStartHeight + projects.getBoundingClientRect().height + 200;

      const aboutMeStartHeight =
        aboutMe.getBoundingClientRect().top + window.scrollY - 500;
      const aboutMeEndHeight =
        aboutMeStartHeight + aboutMe.getBoundingClientRect().height + 200;

      const contactStartHeight =
        contact.getBoundingClientRect().top + window.scrollY - 500;
      const contactEndHeight =
        contactStartHeight + contact.getBoundingClientRect().height + 200;

      if (
        window.scrollY >= skillsStartHeight &&
        window.scrollY < skillsEndHeight
      ) {
        updateLinkStates(0);
      } else if (
        window.scrollY >= projectsStartHeight &&
        window.scrollY < projectsEndHeight
      ) {
        updateLinkStates(1);
      } else if (
        window.scrollY >= aboutMeStartHeight &&
        window.scrollY < aboutMeEndHeight
      ) {
        updateLinkStates(2);
      } else if (
        window.scrollY >= contactStartHeight &&
        window.scrollY < contactEndHeight
      ) {
        updateLinkStates(3);
      } else {
        setLinkStates([false, false, false, false]);
      }
    }

    document.addEventListener("scroll", debounce(scrollHandler, 20));

    return () => {
      document.removeEventListener("scroll", debounce(scrollHandler, 20));
    };
  }, []);

  function updateLinkStates(idx: number) {
    let tempLinkStates: boolean[] = [false, false, false, false];

    tempLinkStates[idx] = true;

    setLinkStates(tempLinkStates);
  }

  return linkStates;
}

export default useNavbarHighlighter;
