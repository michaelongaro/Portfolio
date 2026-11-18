import myHeadshot from "/assets/headshot.jpg";
import { HiOutlineExternalLink } from "react-icons/hi";
import resumePDF from "/assets/MichaelOngaroResume.pdf";

function AboutMe() {
  return (
    <section id="aboutme" className="py-20 scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-orange-600 after:mt-2 after:rounded-full">
          About Me
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
        <img
          src={myHeadshot}
          alt="Michael Ongaro in front of an evergreen tree"
          width={800}
          height={800}
          loading="lazy"
          className="mx-auto aspect-square w-56 max-w-xs rounded-3xl border-4 border-white object-cover shadow-2xl dark:border-stone-300 md:w-full"
        />

        <div className="space-y-6 text-center leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg/relaxed md:text-left">
          <p>
            Hi, I&apos;m Michael, a full-stack developer working with React,
            Next.js, TypeScript, and PostgreSQL. I like seeing a feature through
            from the first conversation to launch, working on everything from
            how the data is structured to how people interact with the app.
            After launch, I look for ways to make it work better for them.
          </p>

          <p>
            I enjoy working through the technical details that make an app
            easier to use. I test the steps people rely on, pay attention to
            accessibility, and keep the code easy for another developer to
            pick up.
          </p>

          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-orange-700"
          >
            <span>View Resume</span>
            <HiOutlineExternalLink className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
