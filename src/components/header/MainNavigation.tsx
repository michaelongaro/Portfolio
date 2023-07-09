import { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import Sidebar from "./Sidebar";

function MainNavigation() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    resizeHandler();

    function resizeHandler() {
      if (window.innerWidth <= 600) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const baseURL =
      window.location.host + window.location.pathname + window.location.hash;
    const path = baseURL.split("/");

    if (path.length === 2) {
      // by default, the first char in the pathname is a "#" which isn't
      // part of the actual id of the element
      const element = document.getElementById(path[1].substring(1));

      element?.scrollIntoView(); // TODO: global css overrides this currently
    }
  }, []);

  return <nav>{showSidebar ? <Sidebar /> : <DesktopNavbar />}</nav>;
}

export default MainNavigation;
