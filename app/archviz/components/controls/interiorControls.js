import { useAtom } from "jotai";
import {
  transitionRunningAtom,
  currentVideoAtom,
  currentSubVideoAtom,
  vdoAtom,
  FadeAtom,
  viewsAtom,
  thumbAtom,
  currentMenuAtom,
  showWalkAtom
} from "@/data/atoms";
import { motion, AnimatePresence } from "framer-motion";
import interiorData from "@/data/scenes/interiorData.json";
import Fade from "../fade";
import { useEffect, useState } from "react";
import { Camera, Cctv, Eye, Footprints, Telescope, Triangle, View } from "lucide-react";
const video = interiorData.videos;
const roomData = {
  lr: {
    dimensions: "17'/12 x 25'3/14'",
    facing: "SW",
  },
  bd1: {
    dimensions: "12' x 16'",
    facing: "N",
  },
  bd2: {
    dimensions: "14' x 10'6'",
    facing: "SW",
  },
  bd3: {
    dimensions: "11' x 16'",
    facing: "SW",
  },
  kit: {
    dimensions: "14' x 9'3/14''",
    facing: "SE",
  },
};

const Dimensions = () => {
  const [sub] = useAtom(currentSubVideoAtom);
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const [currentVideoType] = useAtom(currentVideoAtom);
  return (
    <>
      <AnimatePresence>
        {!transitionRunning && currentVideoType != "hero-loop" && (
          <motion.div
            initial={{
              y: 200,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 200,
            }}
            transition={{
              easings: "easeInOut",
            }}
            className="absolute z-10 bottom-0 right-4 text-gray-50 rounded-[16px] text-[14px] rounded-b-none px-4 py-2 bg-black/80 "
          >
            AREA : {roomData[sub]?.dimensions}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Views = () => {
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const [currentVideoType] = useAtom(currentVideoAtom);
  const [showViews, setShowViews] = useAtom(viewsAtom);
  //   const [showThumb,setShowThumb]=useAtom(thumbAtom)
  //   const[currentMenu,setCurrentMenu]=useAtom(currentMenuAtom)
  const [sub] = useAtom(currentSubVideoAtom);
  const [vdo, setVdo] = useAtom(vdoAtom);
  const [fade, setFade] = useAtom(FadeAtom);
  const[showWalk,setShowWalk]=useAtom(showWalkAtom)
  const viewData = {
    lr: [17, 18, 19],
    bd1: [8, 9, 10],
    bd2: [11, 12, 13],
    bd3: [14, 15, 16],
    kit: [20, 21, 22],
  };

  const handleA = () => {
    setShowWalk(!showWalk)
      if (vdo.id == viewData[sub][0]) {
       
      return;
    } else {
      setFade(true);
      setVdo(video[viewData[sub][0]]);
    
    }
   
  };

  const handleB = () => {
    if (vdo.id == viewData[sub][1]) {
      return;
    } else {
      setFade(true);
      setVdo(video[viewData[sub][1]]);
    }
  };

  const handleC = () => {
    if (vdo.id == viewData[sub][2]) {
      return;
    } else {
      setFade(true);
      setVdo(video[viewData[sub][2]]);
    }
  };

  return (
    <>
      <AnimatePresence key={"asd"}>
        {!transitionRunning && currentVideoType != "hero-loop" && (
          <motion.div
            key={"fefw"}
            initial={{
              x: -200,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -200,
            }}
            transition={{
              easings: "easeInOut",
            }}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-[12]"
          >
            <div
              onClick={() => {
                setShowViews(!showViews);
                handleA();
              }}
              className={`bg-black/80 p-2 rounded-[12px]  ${showWalk ? 'text-gray-300 hover:text-gray-50' : 'text-orange-500  bg-black ring-2 ring-orange-500'}`}

            >
            {showWalk?<Telescope strokeWidth={1.2}/>:<Footprints fill="#f97316"strokeWidth={1.5} stroke="black"/>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showViews && !transitionRunning && currentVideoType != "hero-loop" && (
          <>
            <motion.div
              key="1"
              className="absolute z-10 top-1/2 left-4 -translate-y-1/2 bg-black/80 p-2 rounded-[12px] text-gray-300 hover:text-gray-50 "
              initial={{
                x: 0,
                y: 0,
                rotate: "0deg",
              }}
              animate={{
                x: 50,
                y: "-150%",
                rotate: "360deg",
              }}
              exit={{
                x: 0,
                y: 0,
              }}
              transition={{}}
              onClick={handleB}
            >
              <View strokeWidth={1.2} />
            </motion.div>
            <motion.div
              key="2"
              className="absolute z-10 top-1/2 left-4 -translate-y-1/2 bg-black/80 p-2 rounded-[12px] text-gray-300 hover:text-gray-50 "
              initial={{
                x: 0,
                y: 0,
                rotate: "0deg",
              }}
              animate={{
                x: 50,
                y: "150%",
                rotate: "360deg",
              }}
              exit={{
                x: 0,
                y: 0,
              }}
              transition={{}}
              onClick={handleC}
            >
              <Cctv strokeWidth={1.2} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default function InteriorControls() {
  const [transitionRunning] = useAtom(transitionRunningAtom);
  const [currentVideoType] = useAtom(currentVideoAtom);
  const [sub] = useAtom(currentSubVideoAtom);
  const [vdo, setVdo] = useAtom(vdoAtom);
  const [fade, setFade] = useAtom(FadeAtom);
  const rooms = [
    "Living room",
    "Bed Room 1",
    "Bed Room 2",
    "Kitchen",
    "Bed Room 3",
  ];
  const defaultClass = `bg-black/60 cursor-fancy rounded-[14px] text-[14px] px-4 py-2 hover:text-gray-50 `;
  const activeClass = `bg-black cursor-fancy rounded-[14px] px-4 text-[14px] py-2 text-gray-50 font-semibold`;

  useEffect(()=>{
    console.log('rendered interior controls')
  },[])

  return (
    <>
      <div key="asd">
        {/* <Fade /> */}
      </div>
      <AnimatePresence>
        {!transitionRunning && currentVideoType != "hero-loop" && (
          <motion.div
            initial={{ y: -200, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            exit={{ y: -200, x: "-50%" }}
            transition={{ easings: "easeInOut" }}
            className="absolute z-10 top-2 left-1/2 w-full -translate-x-1/2 "
          >
            <div className="p-4 flex text-gray-300 justify-center gap-3 ">
              <div
                key={rooms[0]}
                className={sub == "lr" ? activeClass : defaultClass}
                onClick={() => {
                  
                  setFade(true);
                  setVdo(video[17]);
                }}
              >
                {rooms[0]}
              </div>
              <div
                key={rooms[1]}
                className={sub == "bd1" ? activeClass : defaultClass}
                onClick={() => {
                    
                  setFade(true);
                  setVdo(video[8]);
                }}
              >
                {rooms[1]}
              </div>
              <div
                key={rooms[2]}
                className={sub == "bd2" ? activeClass : defaultClass}
                onClick={() => {
                  

                  setFade(true);
                  setVdo(video[11]);
                }}
              >
                {rooms[2]}
              </div>
              <div
                key={rooms[3]}
                className={sub == "kit" ? activeClass : defaultClass}
                onClick={() => {
                    

                  setFade(true);
                  setVdo(video[20]);
                }}
              >
                {rooms[3]}
              </div>
              <div
                key={rooms[4]}
                className={sub == "bd3" ? activeClass : defaultClass}
                onClick={() => {
                    

                  setFade(true);
                  setVdo(video[14]);
                }}
              >
                {rooms[4]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Dimensions />
      <Views />
    </>
  );
}
