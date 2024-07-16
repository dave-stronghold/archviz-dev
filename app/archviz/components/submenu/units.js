import { useEffect, useState } from "react";
import { ArrowLeftCircle } from "lucide-react";

import { useAtom } from "jotai";
import {
  transitionRunningAtom,
  sceneAtom,
  handleBackAtom,
  currentMenuAtom,
  thumbAtom,
} from "@/data/atoms";
import { AnimatePresence, motion } from "framer-motion";
export const UnitsSubmenu = () => {
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
    if (key === "back" && transitionRunning == false) {
      setScene("");
      setCurrentMenu("");
      setHandleBack(!handleBack);
      setActive(key);
    }
    if (key === "unit" && transitionRunning == false) {
      setScene("unit");
      // setCurrentMenu("");
      // setHandleBack(!handleBack);
      setActive(key);
    }
    if (key === "unit2" && transitionRunning == false) {
      setScene("unit2");
      // setCurrentMenu("");
      // setHandleBack(!handleBack);
      setActive(key);
    }
  };
  return (
    <AnimatePresence>
      {!transitionRunning && showThumb == false && (
        // <motion.div initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }} transition={{easings:'easeInOut'}}>
        <motion.div
          className="fixed left-0 w-max"
          initial={{ x: -400, delay: 0 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          transition={{ easings: "easeInOut", delay: 0 }}
        >
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
              <ArrowLeftCircle size={20} />
            </div>
            <div
              className={`hover:text-gray-50 ${
                active == "back" && "text-gray-50"
              }`}
              onClick={() => handleClick("unit")}
            >
              Unit 901
            </div>
            <div
              className={`hover:text-gray-50 ${
                active == "back" && "text-gray-50"
              }`}
              onClick={() => handleClick("unit2")}
            >
              Unit 507
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
