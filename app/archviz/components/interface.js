import { useAtomValue, useAtom, atom } from "jotai";
import { Home, Bath, ChevronLeft, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import defaultData from "@/data/scenes/defaultData.json";
import {
  activeButtonStateAtom,
  transitionRunningAtom,
  sceneAtom,
  currentMenuAtom,
  handleBackAtom,
  currentVideoAtom,
} from "@/data/atoms";
import { AmenitiesSubmenu } from "./submenu/amenities";
import { CarouselSubmenu } from "./submenu/carousel";
import { UnitsSubmenu } from "./submenu/units";
import InteriorControls from "./controls/interiorControls";
const defaultActions = defaultData.actions;
const iconsData = [
  // { name: "Home", icon: <ChevronLeft size={18} /> },
  { name: "Elevation", icon: <Building2 size={18} /> },
  { name: "Amenities", icon: <Bath size={18} /> },
  { name: "Units", icon: <Home size={18} /> },
];
const Icon = ({ children, caption, active, onClick }) => {
  const [activeButtonState, setActiveButtonState] = useAtom(
    activeButtonStateAtom
  );
  const [handleBack, setHandleBack] = useAtom(handleBackAtom);
  const [scene, setScene] = useAtom(sceneAtom);
  const transitionRunning = useAtomValue(transitionRunningAtom);
  const [currentMenu, setCurrentMenu] = useAtom(currentMenuAtom);
  const handleClick = () => {
    switch (caption) {
      case "Home": {
        setScene("");
        break;
      }
      case "Amenities": {
        setScene("amenities");
        setCurrentMenu(caption);

        break;
      }
      case "Elevation": {
        setScene("carousel");
        setCurrentMenu("");
        break;
      }
      case "Units": {
        setScene("units");
        setCurrentMenu("Units");
        break;
      }
      default: {
        setScene("");
        break;
      }
    }

    if (!transitionRunning) {
      setActiveButtonState(true);
      // defaultHandleAction(defaultActions.hero);
      setHandleBack(!handleBack);

      // onClick();
    }
  };

  return (
    <div
      className={`flex flex-col items-center text-[12px] gap-1 hover:text-gray-50 select-none font-medium ${
        active && activeButtonState == true ? "text-gray-50" : "text-gray-400"
      }`}
      onClick={handleClick}
    >
      <div>{children}</div>
      <div>{caption != "Home" ? caption : ""}</div>
    </div>
  );
};
const Sidebar = ({ defaultHandleAction }) => {
  const [activeIcon, setActiveIcon] = useState("Home");
  const [currentVideoType] = useAtom(currentVideoAtom);
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const currentMenu = useAtomValue(currentMenuAtom);
  const currentScene = useAtomValue(sceneAtom);
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <>
      <AnimatePresence>
        {/* {(!currentMenu &&!transitionRunning) && ( */}
        {!transitionRunning &&
          currentVideoType == "hero-loop" &&
          !currentMenu && (
            <motion.div
              initial={{ left: -100 }}
              animate={{ left: 0 }}
              exit={{ left: -100 }}
              transition={{ duration: 0.3, easings: "easeIn" }}
              className="relative px-3 py-8 flex flex-col gap-6 ml-10 bg-black/75 backdrop-blur-sm rounded-fancy"
            >
              {iconsData.map(({ name, icon }, i) => (
                <div key={name}>
                  <Icon
                    defaultHandleAction={defaultHandleAction}
                    caption={name}
                    active={activeIcon === name}
                    onClick={() => handleIconClick(name)}
                  >
                    {icon}
                  </Icon>
                </div>
              ))}
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};

export default function Interface({ defaultHandleAction }) {
  const currentMenu = useAtomValue(currentMenuAtom);
  const currentScene = useAtomValue(sceneAtom);
  const currentVideoType = useAtomValue(currentVideoAtom);
  return (
    <>
      <div className="absolute  z-10 top-1/2  -translate-y-1/2 flex justify-center items-center ">
        {<Sidebar defaultHandleAction={defaultHandleAction} />}
        {currentMenu == "Amenities" && (
          <AmenitiesSubmenu defaultHandleAction={defaultHandleAction} />
        )}
        
        {currentMenu == "Units" && currentVideoType == "hero-loop" && (
          <UnitsSubmenu defaultHandleAction={defaultHandleAction} />
        )}
      </div>
        {currentScene == "intro" && (
          <CarouselSubmenu />
        )}
      {currentScene == "interior" && <InteriorControls />}
    </>
  );
}
