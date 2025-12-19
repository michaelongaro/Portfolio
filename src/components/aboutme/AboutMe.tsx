import myHeadshot from "/assets/headshot.jpg";
import { HiOutlineExternalLink } from "react-icons/hi";
import resumePDF from "/assets/MichaelOngaroResume.pdf";

function AboutMe() {
  return (
    <section id="aboutme" className="py-20 scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-500 after:mt-2 after:rounded-full">
          About Me
        </h2>
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl">
              <img
                src={myHeadshot}
                alt="A close-up professional image of my face."
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6 sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center md:text-left">
            <p>
              My name is Michael Ongaro, and I am a passionate web developer
              with a focus on creating accessible, enjoyable, and feature-rich
              web applications. I believe in the power of small, consistent
              improvements to drive progress and success. Whether working with
              established technologies or exploring the cutting-edge, I am
              always eager to learn and innovate.
            </p>

            <p>
              One of the things that sets me apart as a developer is my focus on
              accessibility. I believe that all web applications should be
              designed to be inclusive and usable by everyone, regardless of
              their abilities or disabilities. To achieve this goal, I follow
              industry best practices and strive to stay up-to-date with the
              latest accessibility standards and guidelines to ensure that my
              work is always compliant.
            </p>
          </div>
        </div>
        <a
          href={resumePDF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md md:-ml-24 transition-all "
        >
          <span>View Resume</span>
          <HiOutlineExternalLink className="size-5" />
        </a>
      </div>
    </section>
  );
}

export default AboutMe;
