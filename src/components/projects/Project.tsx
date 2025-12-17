import { useState } from "react";
import openInNewTab from "../../util/openInNewTab";
import smallLightGithubIcon from "../../assets/smallLightGithubLogo.png";
import externalLink from "../../assets/externalLink.svg";

export interface IProject {
  title: string;
  link: string;
  description: string;
  whatILearned: string[];
  challenges: string[];
  technologies: ITechnology[];
  screenshotLink: string;
  screenshotAltText: string;
  githubRepoLink: string;
  slideInFromLeft: boolean;
  projectNumber: number;
}

interface ITechnology {
  imageLocation: string;
  altText: string;
}

function Project({
  title,
  link,
  description,
  whatILearned,
  challenges,
  technologies,
  screenshotLink,
  screenshotAltText,
  githubRepoLink,
  slideInFromLeft,
}: IProject) {
  const [activeTab, setActiveTab] = useState<"learned" | "challenges">(
    "learned"
  );

  return (
    <article
      className={`flex flex-col lg:flex-row gap-8 items-start max-w-6xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl ${
        slideInFromLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div
          className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
          onClick={() => link !== "deadLink" && openInNewTab(link)}
        >
          <img
            src={screenshotLink}
            alt={screenshotAltText}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="flex justify-center gap-4">
          {link !== "deadLink" && (
            <button
              onClick={() => openInNewTab(link)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <span>Visit</span>
              <img src={externalLink} alt="External Link" className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => openInNewTab(githubRepoLink)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <img src={smallLightGithubIcon} alt="GitHub" className="w-5 h-5" />
            <span>Repository</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <div
                key={tech.altText}
                className="relative group"
                title={tech.altText}
              >
                <img
                  src={tech.imageLocation}
                  alt={tech.altText}
                  className="w-8 h-8 object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-600 mb-4">
            <button
              onClick={() => setActiveTab("learned")}
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "learned"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              What I Learned
              {activeTab === "learned" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "challenges"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Challenges
              {activeTab === "challenges" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </button>
          </div>

          <div className="min-h-[100px]">
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              {(activeTab === "learned" ? whatILearned : challenges).map(
                (item, idx) => (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Project;
