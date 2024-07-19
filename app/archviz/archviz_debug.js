"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import screenfull from 'screenfull';
// import carouselData from "@/data/scenes/carouselData";
import carouselData from "@/data/scenes/testCarouselData";
import PrefetchVideos from "./PrefetchVideos";
import defaultData from "@/data/scenes/defaultData.json";
import swimmingData from "@/data/scenes/swimmingPoolData.json";
import clubData from "@/data/scenes/clubHouseData.json";
import parkData from "@/data/scenes/parkData.json";
// import aptData from "@/data/scenes/aptData.json";
import aptData from "@/data/scenes/testApt.json";
import aptData2 from "@/data/scenes/apt507.json";
import interiorData from "@/data/scenes/interiorData.json";

import {
  transitionRunningAtom,
  sceneAtom,
  FadeAtom,
  handleBackAtom,
  thumbAtom,
  currentVideoAtom,
  interiorSignalAtom,
  currentMenuAtom,
  currentSubVideoAtom,
  vdoAtom,
  currentVideoLoadedAtom,
  readyToFadeAtom,
} from "@/data/atoms";

const defaultVideo = defaultData.videos;
// const video = swimmingData.videos;
// const video = carouselData.videos;
// const actions = swimmingData.actions;
import carouselUrls from "../../data/scenes/carousel_prefetchers.json";
import videoUrls from "../../data/scenes/complete_prefetchers.json";
import Thumbnails from "./components/thumbnails";
import Interface from "./components/interface";
import { Eye, EyeOff, Fullscreen, Shrink } from "lucide-react";
import Fade from "./components/fade";
const videosToFetch = videoUrls.videoUrls;

export default function Archviz() {
  // const [fade, setFade] = useAtom(FadeAtom);
  const [scene] = useAtom(sceneAtom);
  const [video, setVideo] = useState(carouselData.videos);
  const [debug, setDebug] = useState(false);

  // const [actions, setActions] = useState(null);
  const [actions, setActions] = useState(carouselData.actions);
  const [showThumb, setShowThumb] = useAtom(thumbAtom);
  const [videoDuration, setVideoDuration] = useState(null);
  const [showFg, setShowFg] = useState(true);
  const [vdo_b, setVdo_b] = useState(video[1]);
  // const [vdo, setVdo] = useState(vdo_b);
  const [vdo, setVdo] = useAtom(vdoAtom);
  const vdo_bRef = useRef(null);
  const [currentVideoType, setCurrentVideoType] = useAtom(currentVideoAtom);
  const [currentSub, setCurrentSub] = useAtom(currentSubVideoAtom);
  // const [currentVideoType, setCurrentVideoType] = useState(vdo.type);
  const [homeRun, setHomeRun] = useState(true);
  const [transitionRunning, setTransitionRunning] = useAtom(
    transitionRunningAtom
  );
  const [handleBack, setHandleBack] = useAtom(handleBackAtom);
  const [interiorSignal, setInteriorSignal] = useAtom(interiorSignalAtom);
  const [currentMenu, setCurrentMenu] = useAtom(currentMenuAtom);
  const [interfaceUI, setInterfaceUI] = useState(true);
  const [fullscreen, setFullScreen] = useState(false);
  const [currentVideoLoaded, setLoaded] = useAtom(currentVideoLoadedAtom);
  const[canFade,setCanFade]=useAtom(readyToFadeAtom)
  const containerRef=useRef(null)
  // useEffect(() => {
  //   if (vdo?.type) {
  //     setCurrentVideoType(vdo.type);
  //   }
  // }, [vdo, setCurrentVideoType]);
  useEffect(() => {
    const handleSourceVideos = () => {
      switch (scene) {
        case "intro": {
          setShowThumb(true);
          break;
        }
        case "carousel": {
          if (currentVideoType != "1-loop") {
            setActions(carouselData.actions);
            setVideo(carouselData.videos);
            setVdo(carouselData.videos[12]);
          }
          // setShowThumb(false);
          setShowThumb(true);
          break;
        }
        case "amenities": {
          // if (currentVideoType == "1-loop") {
          //   setFade(true);
          // }
          setVdo(defaultVideo[0]);
          setShowThumb(false);
          break;
        }
        case "swimming": {
          setVideo(swimmingData.videos);
          setVdo(swimmingData.videos[1]);
          setShowThumb(true);
          setActions(swimmingData.actions);
          break;
        }
        case "club": {
          setVideo(clubData.videos);
          setVdo(clubData.videos[1]);
          setShowThumb(true);
          setActions(clubData.actions);
          break;
        }
        case "parking": {
          setVideo(parkData.videos);
          setVdo(parkData.videos[1]);
          setShowThumb(true);
          setActions(parkData.actions);
          break;
        }
        case "units": {
          // setVideo(aptData.videos);
          // setVdo(aptData.videos[1]);
          setVdo(defaultVideo[0]);
          setShowThumb(false);
          // setActions(aptData.actions);
          break;
        }
        case "unit": {
          setVideo(aptData.videos);
          setVdo(aptData.videos[13]);
          setShowThumb(true);
          setActions(aptData.actions);
          break;
        }
        case "unit2": {
          setVideo(aptData2.videos);
          setVdo(aptData2.videos[13]);
          setShowThumb(true);
          setActions(aptData2.actions);
          break;
        }
        case "iso1": {
          setVdo(interiorData.videos[6]);
          setShowThumb(true);
          setActions(aptData.actions);
          !transitionRunning && setVideo(aptData.videos);
          break;
        }
        case "iso2": {
          setVdo(interiorData.videos[7]);
          setShowThumb(true);
          setActions(aptData.actions);
          !transitionRunning && setVideo(aptData.videos);

          break;
        }
        case "interior": {
          setVideo(interiorData.videos);
          if (interiorSignal == "iso1") {
            setVdo(interiorData.videos[0]);
          }
          if (interiorSignal == "iso2") {
            setVdo(interiorData.videos[23]);
          }
          setShowThumb(true);
          setActions(interiorData.actions);
          break;
        }
        default:
          {
            setShowThumb(false);
            // setCurrentMenu('')
          }
          break;
      }
    };
    handleSourceVideos();
    return () => {};
  }, [scene]);

  // const [vdo_b, setVdo_b] = useState(video[0]);
  // const [vdo, setVdo] = useState(video[0]);

  // const defaultHandleAction = (default_action) => {
  //   if (default_action.transitions[currentVideoType]) {
  //     setVdo(video[default_action.transitions[currentVideoType]]);
  //     setHomeRun(true);
  //   }
  // };

  const defaultHandleAction = () => {
    if (defaultData.actions.hero.transitions[currentVideoType]) {
      setVdo(video[defaultData.actions.hero.transitions[currentVideoType]]);
      setHomeRun(true);
    }
  };

  useEffect(() => {
    defaultHandleAction();
  }, [handleBack]);

  const handleAction = (action) => {
    if (action.transitions[currentVideoType]) {
      setVdo(video[action.transitions[currentVideoType]]);
    }
  };

  useEffect(() => {
    if (vdo.loop) {
      setTransitionRunning(false);
    } else {
      setTransitionRunning(true);
    }
  }, [vdo, transitionRunning]);

  const handlePause = (e) => {
    e.currentTime = 10;
    e.pause();
  };

  useEffect(() => {
    setCanFade(false)
    if(!vdo_b.loop)
    handlePause(vdo_bRef.current);
  }, [vdo_b]);

  const handleVideoStart = () => {
    setCurrentVideoType(vdo.type);
    setCurrentSub(vdo.sub);
    if (scene=='interior') {
      setVdo_b(vdo);
    }
    vdo.to != undefined ? setVdo_b(video[vdo.to]) : null;
    vdo.toIso1 != undefined ? setVdo_b(defaultVideo[1]) : null;
    vdo.toIso2 != undefined ? setVdo_b(defaultVideo[2]) : null;
    vdo.toDefault != undefined ? setVdo_b(defaultVideo[0]) : null;
  };

  const handleVideoEnd = () => {
    if (vdo.toDefault) {
      setVdo(defaultVideo[0]);
      console.log("executing default");
      return;
    }
    if (vdo.toIso1) {
      setVdo(defaultVideo[1]);
      console.log("executing iso1");
      return;
    }
    if (vdo.toIso2) {
      setVdo(defaultVideo[2]);
      console.log("executing iso1");
      return;
    }
    if (vdo.to) {
      setVdo(video[vdo.to]);
      console.log("executing to");
    }
  };
  
  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current,{navigationUI:'hide'});
    }
    setFullScreen(prev=>!prev);
  };

  return (
    <>
      <PrefetchVideos videoUrls={carouselUrls.carouselUrls} />
      <div ref={containerRef} className="relative cursor-fancy overflow-hidden">
        {/* <div>{vdo.path}</div> */}
        {/* <div>{currentVideoLoaded.toString()}</div> */}
        <Fade />
        {/* <div className="fixed bg-gray-600 p-10 top-0 left-0 z-30">
          {currentVideoType?currentVideoType:"undefined"}
          {vdo.path}
        </div> */}
        {/* {console.log(canFade)} */}
        <button  onClick={handleFullscreen} className="fixed z-[11] top-0 right-0 p-2 rounded-bl-[18px] text-gray-200  bg-black">
        {!fullscreen ? (
            <Fullscreen strokeWidth={1.2} size={23} />
          ) : (
            <Shrink strokeWidth={1.2} size={23} />
          )}
      </button>
        <button
          className="fixed z-[11] bottom-0 left-0 p-2 rounded-tr-[18px] text-gray-200  bg-black"
          onClick={() => setInterfaceUI(!interfaceUI)}
        >
          {interfaceUI ? (
            <EyeOff strokeWidth={1.2} size={23} />
          ) : (
            <Eye strokeWidth={1.2} size={23} />
          )}
        </button>
        {interfaceUI && <Interface />}
       
        {/* <button
          className="fixed z-[21] bg-yellow-600"
          onClick={() => setDebug((prev) => !prev)}
        >
          {debug ? "View Realtime" : "View Debug"}
        </button> */}
        {/* <div className="fixed z-[11]">{canFade.toString()}</div> */}

        <div className="relative w-screen  h-dvh overflow-y-hidden">
          {/* {showFg && (
            <>
              <Image
              className="absolute hidden w-full"
              priority={true}
              src="/bg2.webp"
              width={1920}
              height={1080}
              alt="background"
              />
            </>
          )} */}
          <div
            className={`h-full ${debug ? " h-1/2" : "absolute w-full"}`}
          >
            <video
              muted
              key={1}
              poster="image"
              // className='w-full'
              className="h-full w-full object-cover"
              src={vdo.path}
              type="video/mp4"
              autoPlay={true}
              loop={vdo.loop}
              preload="metadata"
              controlsList="nodownload nofullscreen noremoteplayback"
              x5-playsinline="true"
              playsInline
              disablePictureInPicture
              webkit-playsinline="true"
              onCanPlay={() => setShowFg(false)}
              // onPlay={handleVideoStart}
              // onCanPlayThrough={handleVideoStart}
              onPlaying={handleVideoStart}
              onEnded={handleVideoEnd}
            ></video>
          </div>
          
          <div className={`h-full ${debug ? "h-1/2" : "w-full"}`}>
            <video
              ref={vdo_bRef}
              controlsList="nodownload nofullscreen noremoteplayback"
              preload="auto"
              muted
              type="video/mp4"
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              disablePictureInPicture
              onPlaying={()=>setCanFade(true)}
              onLoadedData={()=>setCanFade(false)}
              key={2}
              className="h-full w-full object-cover"

              // className="w-full"
              src={vdo_b.path}
              autoPlay={true}
              // loop={vdo_b.loop}
            ></video>
          </div>
        </div>
        {showThumb && (
          <Thumbnails
            interfaceUI={interfaceUI}
            actions={actions}
            handleAction={handleAction}
            homeRun={homeRun}
            setHomeRun={setHomeRun}
            currentVideoType={currentVideoType}
          />
        )}
        {/* <PrefetchVideos videoUrls={videosToFetch} /> */}
      </div>
    </>
  );
}
