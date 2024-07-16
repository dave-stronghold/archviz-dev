import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import {
  transitionRunningAtom,
  sceneAtom,
  handleBackAtom,
  currentMenuAtom,
  thumbAtom,
} from "@/data/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "lucide-react";
export const CarouselSubmenu = () => {
  const [active, setActive] = useState("");
  const [scene, setScene] = useAtom(sceneAtom);
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const [handleBack, setHandleBack] = useAtom(handleBackAtom);
  const [currentMenu, setCurrentMenu] = useAtom(currentMenuAtom);
  const [showThumb, setShowThumb] = useAtom(thumbAtom);

  const handleClick = (key) => {
    if (key === "back" && transitionRunning == false) {
      setScene("");
      setCurrentMenu("");
      setHandleBack(!handleBack);
      setActive(key);
    }
  };
  return (
      <AnimatePresence>
        {!transitionRunning && (
          <motion.div
            className="absolute z-10 left-0 top-1/2 -translate-y-1/2 "
            initial={{ x: -400, delay: 0 }}
            animate={{ x: 0,y:'-50%' }}
            exit={{ x: -400 }}
            transition={{ easings: "easeInOut", delay: 0 }}
          >
            <div className="p-3   bg-black/80 backdrop-blur-sm text-gray-400 text-sm rounded-[16px] ml-5 flex flex-col gap-4 ">
              <div
                className={`hover:text-gray-50 w-max text-center flex flex-col justify-center items-center ${
                  active == "back" && "text-gray-50"
                }`}
                onClick={() => handleClick("back")}
              >
                <Home size={18} /> <div className="text-[12px]">Menu</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  
  );
};
