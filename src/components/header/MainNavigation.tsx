import { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import Sidebar from "./Sidebar";

function MainNavigation(props: any) {
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

  return <nav>{showSidebar ? <Sidebar /> : <DesktopNavbar />}</nav>;
}

export default MainNavigation;
