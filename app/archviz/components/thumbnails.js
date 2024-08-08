import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  ArrowLeft,
  Camera,
  ChevronLeft,
  ChevronRight,
  Footprints,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  activeButtonStateAtom,
  transitionRunningAtom,
  handleBackAtom,
  sceneAtom,
  interiorSignalAtom,
  currentMenuAtom,
  showWalkAtom,
} from "@/data/atoms";
// import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Lottie = () => {
  return (
    <Player
      autoplay
      loop
      src="/drone.json"
      style={{ height: "200px", width: "200px" }}
    ></Player>
  );
};
export default function Thumbnails({
  actions,
  handleAction,
  interfaceUI,
  currentVideoType,
  homeRun,
  setHomeRun,
}) {
  const actionKeys = Object.keys(actions);
  const [selectedAction, setSelectedAction] = useState(actionKeys[0]);
  const [activeButtonState, setActiveButtonState] = useAtom(
    activeButtonStateAtom
  );
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const [handleBack, setHandleBack] = useAtom(handleBackAtom);
  const [scene, setScene] = useAtom(sceneAtom);
  const [interiorSignal, setInteriorSignal] = useAtom(interiorSignalAtom);
  const [currentMenu, setCurrentMenu] = useAtom(currentMenuAtom);
  const [showTour, setShowTour] = useState(false);
  const [showWalk] = useAtom(showWalkAtom);

  return (
    <>
      {/* <div className="absolute bottom-14 bg-yellow-200 text-black">{currentVideoType}</div> */}
      <div
        className={`${interfaceUI ? "scale-[0.65] lg:scale-100" : "hidden"}`}
      >
        <AnimatePresence>
          {!transitionRunning && actions.tour && showTour && (
            <motion.div
              initial={{
                y: "100vh",
                x: 0,
              }}
              animate={{
                y: 0,
                x: "-50%",
              }}
              exit={{
                y: "100vh",
                x: 0,
              }}
              transition={{
                easings: "easeInOut",
              }}
              className="absolute bottom-[100vh] left-4  lg:left-1/2 lg:top-[unset] lg:bottom-28 text-gray-200"
              // className="absolute bg-cyan-200 bottom-24 left-1/2   text-gray-200"
            >
              <div
                onClickCapture={() => {
                  setScene("interior");
                }}
                className="flex bg-black/80 px-4 py-2 rounded-[16px] justify-center items-center gap-2  hover:bg-orange-400 hover:text-black font-medium "
              >
                <Camera size={18} /> Guided Tour
              </div>
              <div className="absolute -z-10 bottom-0">
                {/* <Lottie /> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!transitionRunning && (
            <motion.div
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              exit={{ y: 150 }}
              transition={{ easings: "easeIn" }}
            >
              <div className="absolute bottom-4  flex left-1/2 -translate-x-1/2 justify-center items-center gap-0 bg-black/80 rounded-[24px] lg:rounded-b-none lg:bottom-0  px-5 py-4">
                <div
                  className="text-gray-300 hover:text-lg bg-black p-2 rounded-full hover:bg-orange-600 hover:text-black"
                  onClickCapture={() => {
                    if (scene == "interior") {
                      setHandleBack(!handleBack);
                      setScene(interiorSignal);
                      // setInteriorSignal('iso1')
                    } else {
                      setHandleBack(!handleBack);
                      setScene("");
                    }
                    if (scene == "carousel") {
                      setCurrentMenu("");
                    }
                    if (scene == "intro") {
                      setCurrentMenu("");
                    }
                    // setScene("unit");
                  }}
                >
                  <ArrowLeft size={18} />
                </div>
                {actionKeys.map((key) => {
                  const action = actions[key];
                  const isSelected = selectedAction === key;

                  return (
                    <div key={key}>
                      {key == "Previous" && (
                        <div
                          onClickCapture={() => {
                            handleAction(action);
                          }}
                          className="text-gray-200 rounded-[12px] p-2 ml-4 bg-black hover:bg-orange-500 hover:text-black"
                        >
                          <ChevronLeft />
                        </div>
                      )}
                      {key == "Next" && (
                        <div
                          onClickCapture={() => {
                            handleAction(action);
                          }}
                          // className={`${showWalk?"text-gray-200 rounded-[12px] p-2 bg-black hover:bg-orange-500 hover:text-black":"hidden"}`}
                          className="text-gray-200 rounded-[12px] p-2 ml-4 bg-black hover:bg-orange-500 hover:text-black"
                        >
                          <ChevronRight />
                        </div>
                      )}
                      {key == "Next_in" && showWalk && (
                        <div
                          onClickCapture={() => {
                            handleAction(action);
                          }}
                          // className={`${showWalk?"text-gray-200 rounded-[12px] p-2 bg-black hover:bg-orange-500 hover:text-black":"hidden"}`}
                          className="text-gray-200 rounded-[12px] p-2 ml-4 bg-black hover:bg-orange-500 hover:text-black"
                        >
                          <Footprints size={28} strokeWidth={1.2} />
                        </div>
                      )}
                      {action.path && (
                        <img
                          onClickCapture={() => {
                            if (!transitionRunning) {
                              setHomeRun(false);
                              action.invokeTour == false
                                ? setShowTour(false)
                                : setShowTour(true);

                              handleAction(action);
                              setSelectedAction(key);
                              setInteriorSignal(key);
                              console.log(key);
                            }
                          }}
                          src={action.path}
                          className={`h-14 rounded-md hover:scale-110 shadow-lg ml-4 shadow-black/30 transition-transform ${
                            isSelected ? "ring-2 ring-white/80" : ""
                          }`}
                          alt=""
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
