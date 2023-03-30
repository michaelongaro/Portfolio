import { useEffect } from "react";

function useSlideInProjects() {
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
}

export default useSlideInProjects;
