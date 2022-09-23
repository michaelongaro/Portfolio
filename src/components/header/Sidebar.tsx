import React, { useEffect, useRef, useState } from "react";

import Hamburger from "hamburger-react";

import classes from "./Sidebar.module.css";
import navClasses from "./DesktopNavbar.module.css";
import "../../index.css";

type Props = {};

function Sidebar({}: Props) {
  const burgerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  useEffect(() => {
    function closeSidebarHandler(e: TouchEvent | MouseEvent) {
      console.log(e.target);

      if (
        e.target instanceof HTMLElement &&
        !burgerRef?.current?.contains(e.target) &&
        !sidebarRef?.current?.contains(e.target)
      ) {
        setSidebarOpened(false);
      }
    }

    document.addEventListener("click", closeSidebarHandler);
    document.addEventListener("touchend", closeSidebarHandler);
    return () => {
      document.removeEventListener("click", closeSidebarHandler);
      document.removeEventListener("touchend", closeSidebarHandler);
    };
  }, []);

  return (
    <>
      <div style={{ height: "5rem" }} className={navClasses.navContainer}></div>
      <div ref={burgerRef} className={classes.burgerIconContainer}>
        <Hamburger
          color={"#e2e2e2"}
          onToggle={(toggled) => {
            if (toggled) {
              setSidebarOpened(true);
            } else {
              setSidebarOpened(false);
            }
          }}
          toggled={sidebarOpened}
          toggle={setSidebarOpened}
        />
      </div>

      <div
        style={{
          width: sidebarOpened ? "75%" : 0,
          opacity: sidebarOpened ? 1 : 0,
        }}
        ref={sidebarRef}
        className={classes.sidebarBody}
      >
        <div
          style={{ display: sidebarOpened ? "flex" : "none" }}
          className={`baseVertFlex ${classes.sidebarLinks}`}
        >
          <div className={`${classes.sidebarNavLinks} baseVertFlex`}>
            <div
              style={{ gap: "2.5em" }}
              className={`${navClasses.navButton} baseVertFlex`}
            >
              <a
                onClick={() => {
                  setSidebarOpened(false);
                }}
                href={"#skills"}
              >
                Skills
              </a>
              <a
                onClick={() => {
                  setSidebarOpened(false);
                }}
                href={"#projects"}
              >
                Projects
              </a>
              <a
                onClick={() => {
                  setSidebarOpened(false);
                }}
                href={"#aboutme"}
              >
                About Me
              </a>
              <a
                onClick={() => {
                  setSidebarOpened(false);
                }}
                href={"#contact"}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
