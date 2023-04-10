import Project from "./Project";
import useProjectMetadata from "../../hooks/useProjectMetadata";
import useSlideInProjects from "../../hooks/useSlideInProjects";

import "../../index.css";

function Projects() {
  useSlideInProjects();
  const projectMetadata = useProjectMetadata();

  return (
    <div
      id={"projects"}
      style={{
        marginTop: "8rem",
        gap: "1.5rem",
        width: "100%",
        overflow: "clip",
        scrollMarginTop: "8rem",
      }}
      className={"baseVertFlex"}
    >
      <h2 className="heading">Projects</h2>

      <Project {...projectMetadata[0]} />
      <Project {...projectMetadata[1]} />
      <Project {...projectMetadata[2]} />
      <Project {...projectMetadata[3]} />
      <Project {...projectMetadata[4]} />
    </div>
  );
}

export default Projects;
