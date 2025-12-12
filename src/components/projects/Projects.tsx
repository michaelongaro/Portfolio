import Project from "./Project";
import useProjectMetadata from "../../hooks/useProjectMetadata";

function Projects() {
  const projectMetadata = useProjectMetadata();

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-500 after:mt-2 after:rounded-full">
          Projects
        </h2>
      </div>
      
      <div className="space-y-20">
        {projectMetadata.map((project, index) => (
          <Project key={project.projectNumber} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
