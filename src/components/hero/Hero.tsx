import { useState, type KeyboardEvent } from "react";
import openInNewTab from "../../util/openInNewTab";
import mediumGithubLogo from "../../assets/mediumGithubLogo.png";
import Scene from "./Scene";

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-end items-center text-center py-20 overflow-hidden">
      <Scene />
    </section>
  );
}

export default Hero;
