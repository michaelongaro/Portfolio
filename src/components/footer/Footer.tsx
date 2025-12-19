function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 dark:bg-slate-900/80  py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          © {currentYear} Michael Ongaro. All rights reserved.
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/michaelongaro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 px-3 py-2 rounded-md dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-300 hover:text-primary-light"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
