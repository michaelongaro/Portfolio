import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import useNavbarHighlighter from "../../util/useNavbarHighlighter";
import Hamburger from "hamburger-react";
import { LuSun, LuMoon } from "react-icons/lu";

const navLinks = [
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "About Me", href: "#aboutme" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const linkStates = useNavbarHighlighter();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-xl sm:text-2xl font-bold tracking-tight text-primary-light"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                history.pushState(null, "", "/");
              }}
            >
              Michael Ongaro
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    linkStates[idx]
                      ? "text-orange-600 dark:text-orange-600 bg-orange-50 dark:bg-stone-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-stone-800"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <LuSun
                    style={{
                      filter: "drop-shadow(0px 0px 0px rgb(202,138,4))",
                    }}
                    className="size-[18px] stroke-yellow-500"
                  />
                ) : (
                  <LuMoon className="size-[18px] text-blue-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-stone-800"
            >
              {theme === "light" ? (
                <LuSun
                  style={{
                    filter: "drop-shadow(0px 0px 0px rgb(202,138,4))",
                  }}
                  className="size-[18px] stroke-yellow-600"
                />
              ) : (
                <LuMoon className="size-[18px] text-blue-400" />
              )}
            </button>
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  shadow-lg">
          <div className="px-2 flex place-self-center max-w-sm justify-between pt-2 pb-3 sm:px-3">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className={` px-3 py-2 rounded-md text-base font-medium ${
                  linkStates[idx]
                    ? "text-orange-600 dark:text-orange-600 bg-orange-50 dark:bg-stone-800"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-stone-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
