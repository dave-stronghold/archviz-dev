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
import { ArrowLeftCircle } from "lucide-react";
export const AmenitiesSubmenu = ({ defaultHandleAction }) => {
  const [active, setActive] = useState("");
  const [scene, setScene] = useAtom(sceneAtom);
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const [handleBack, setHandleBack] = useAtom(handleBackAtom);
  const [currentMenu, setCurrentMenu] = useAtom(currentMenuAtom);
  const [showThumb, setShowThumb] = useAtom(thumbAtom);

  useEffect(() => {
    setActive(scene);
  }, [scene]);
  const handleClick = (key) => {
    if (key === "swimming" && transitionRunning == false) {
      setScene("swimming");
      // defaultHandleAction(defaultActions["hero"]);
      setActive(key);
    }
    if (key === "club" && transitionRunning == false) {
      setScene("club");
      // defaultHandleAction(defaultActions["hero"]);
      setActive(key);
    }
    if (key === "parking" && transitionRunning == false) {
      setScene("parking");
      // defaultHandleAction(defaultActions["hero"]);
      setActive(key);
    }
    if (key === "back" && transitionRunning == false) {
      setScene("");
      setCurrentMenu("");
      setHandleBack(!handleBack);
      setActive(key);
    
    }
  };
  return (
    <AnimatePresence>
      {(!transitionRunning&&showThumb==false) && (
        <motion.div className="absolute left-0 w-max" initial={{ x: -400,delay:0 }} animate={{ x: 0 }} exit={{ x: -400 }} transition={{easings:'easeInOut',delay:0}}>
          {/* initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        > */}
          <div className="py-8 px-6  bg-black/80 backdrop-blur-sm text-gray-400 text-sm rounded-fancy ml-5 flex flex-col gap-4 ">
            <div
              className={`hover:text-gray-50 ${
                active == "back" && "text-gray-50"
              }`}
              onClick={() => handleClick("back")}
            >
              <ArrowLeftCircle size={20}/>
            </div>
            <div
              className={`hover:text-gray-50 ${
                active == "club" && "text-gray-50"
              }`}
              onClick={() => handleClick("club")}
            >
              Club House
            </div>
            <div
              className={`hover:text-gray-50 ${
                active == "swimming" && "text-gray-50"
              }`}
              onClick={() => handleClick("swimming")}
            >
              Swimming Pool
            </div>
            <div
              className={`hover:text-gray-50 ${
                active == "parking" && "text-gray-50"
              }`}
              onClick={() => handleClick("parking")}
            >
              Parking
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
