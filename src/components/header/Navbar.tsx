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
  const [scrolled, setScrolled] = useState(false);
  const linkStates = useNavbarHighlighter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-primary-light dark:text-primary-dark font-mono"
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    linkStates[idx]
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <LuSun className="size-4 text-yellow-500" />
                ) : (
                  <LuMoon className="size-4 text-blue-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === "light" ? (
                <LuSun className="size-4 text-yellow-500" />
              ) : (
                <LuMoon className="size-4 text-blue-400" />
              )}
            </button>
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={24} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  linkStates[idx]
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-slate-800"
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
