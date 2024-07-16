"use client";
import { useEffect, useState } from "react";
import Archviz from "./archviz/archviz_debug";
import PortraitComponent from "./PortraitComponente"; // Import the portrait component
import Fade from "./archviz/components/fade";

export default function Home() {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOrientationChange = () => {
        setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
      };

      const matchMedia = window.matchMedia("(orientation: landscape)");
      handleOrientationChange(); // Set the initial state
      matchMedia.addEventListener("change", handleOrientationChange);

      // Cleanup event listener on component unmount
      return () => {
        matchMedia.removeEventListener("change", handleOrientationChange);
      };
    }
  }, []);

  return (
    <>
      <div className={`${isLandscape?'':'hidden'}`}>
        <Archviz />
      </div>
      <div className={`${isLandscape?'hidden':''}`}>
        <PortraitComponent />
      </div>
      {/* {isLandscape ? (
        <>
          <Archviz />
        </>
      ) : (
        <PortraitComponent />
      )} */}
    </>
  );
}
