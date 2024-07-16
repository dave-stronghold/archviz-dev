import { useState } from "react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { activeButtonStateAtom, transitionRunningAtom } from "@/data/atoms";
export default function Thumbnails({
  actions,
  handleAction,
  currentVideoType,
  homeRun,
  setHomeRun,
}) {
  const [selectedAction, setSelectedAction] = useState(Object.keys(actions)[0]);
  const [activeButtonState, setActiveButtonState] = useAtom(
    activeButtonStateAtom
  );
  const [transitionRunning] = useAtom(transitionRunningAtom);
  console.log(selectedAction);
  return (
    <>
      <AnimatePresence>
        {!transitionRunning && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ easings: "easeIn" }}
          >
            <div className="absolute bottom-0 flex left-1/2 -translate-x-1/2 justify-center items-center gap-4 bg-black/80 rounded-[24px] rounded-b-none px-5 py-4">
              {/* <div className="absolute bottom-12 flex left-1/2 -translate-x-1/2 justify-center items-center gap-4  rounded-[8px] px-5 py-4"> */}
              {Object.keys(actions).map((key) => {
                const action = actions[key];
                const isSelected = selectedAction === action;
                console.log(isSelected);
                return (
                  <div key={key}>
                    <img
                      onClick={() => {
                        if (transitionRunning == false) {
                          setHomeRun(false);
                          handleAction(action);
                          setSelectedAction(action);

                          // setActiveButtonState(false);
                        }
                      }}
                      src={action.path}
                      className={`h-14 rounded-md hover:scale-110 shadow-lg shadow-black/30 transition-transform ${
                        isSelected && homeRun == false
                          ? "ring-2 ring-white/80 "
                          : ""
                      }`}
                      alt=""
                    />
                  </div>
                );
              })}
              {/* <p className="w-60 text-white">{JSON.stringify(activeButtonState,null,2)}</p> */}
              {/* <p className="w-60 text-black">{JSON.stringify(selectedAction)}</p> 
      <p className="w-60 text-black">{homeRun.toString()}</p> */}
              {/* <p className="w-60 text-white">{currentVideoType}</p> */}
            </div>
            {/* <div className="absolute w-1/3 left-1/2 -translate-x-1/2 h-4 m-0 p-0 bottom-0 rounded-fancy rounded-b-none bg-black/80 text-center"></div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
