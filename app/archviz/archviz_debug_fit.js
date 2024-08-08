"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import screenfull from "screenfull";

import PrefetchVideos from "./PrefetchVideos";

import carouselData from "@/data/scenes/carouselData";
import defaultData from "@/data/scenes/defaultData.json";
import swimmingData from "@/data/scenes/swimmingPoolData.json";
import clubData from "@/data/scenes/clubHouseData.json";
import parkData from "@/data/scenes/parkData.json";
import aptData from "@/data/scenes/apt901.json";
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
  showAAtom,
  loadingAtom,
  showloadingAtom,
  interfaceUIAtom,
} from "@/data/atoms";

const defaultVideo = defaultData.videos;
import carouselUrls from "../../data/scenes/carousel_prefetchers.json";
import videoUrls from "../../data/scenes/complete_prefetchers.json";
import Thumbnails from "./components/thumbnails";
import Interface from "./components/interface";
import { Eye, EyeOff, Fullscreen, Shrink } from "lucide-react";
import Fade from "./components/fade";
import Loading from "./components/loading";
import Panorama from "./components/panorama/panorama";
const videosToFetch = videoUrls.videoUrls;

export default function Archviz() {
  const [scene] = useAtom(sceneAtom);
  const [video, setVideo] = useState(carouselData.videos);
  const [debug, setDebug] = useState(false);
  const [play, setPlay] = useState(false);
  const [debugButton] = useState(false);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [actions, setActions] = useState(carouselData.actions);
  const [showThumb, setShowThumb] = useAtom(thumbAtom);
  const [a, showA] = useAtom(showAAtom);
  const [b, showB] = useState(false);
  const [vdo, setVdo] = useAtom(vdoAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const [currentVideoType, setCurrentVideoType] = useAtom(currentVideoAtom);
  const [currentSub, setCurrentSub] = useAtom(currentSubVideoAtom);
  const [homeRun, setHomeRun] = useState(true);
  const [transitionRunning, setTransitionRunning] = useAtom(
    transitionRunningAtom
  );
  const [handleBack, setHandleBack] = useAtom(handleBackAtom);
  const [interiorSignal, setInteriorSignal] = useAtom(interiorSignalAtom);

  const [interfaceUI, setInterfaceUI] = useAtom(interfaceUIAtom);
  const [fullscreen, setFullScreen] = useState(false);

  const [canFade, setCanFade] = useAtom(readyToFadeAtom);
  const [showLoading, setShowLoading] = useAtom(showloadingAtom);
  const containerRef = useRef(null);

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

          setShowThumb(true);
          break;
        }
        case "amenities": {
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
          setVdo(defaultVideo[0]);
          setShowThumb(false);
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
          }
          break;
      }
    };
    handleSourceVideos();
    return () => {};
  }, [scene]);

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
      console.log("action");
    }
  };

  const handlePlay = () => {
    if (showA) showA(false);
    setCurrentVideoType(vdo.type);
    // setCanFade(true);
    setCurrentSub(vdo.sub);
  };
  const handleDelayedVideoEnd = () => {
    setTimeout(handleVideoEnd, 200);
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

  useEffect(() => {
    if (vdo.loop) {
      setTransitionRunning(false);
    } else {
      setTransitionRunning(true);
    }
  }, [vdo, transitionRunning]);

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
    setFullScreen((prev) => !prev);
  };

  let rafHandle = useRef(null);
  let frameCount = 0;
  const skipFrames = 30; // Number of frames to skip

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const updateCanvas = () => {
      frameCount++;
      if (
        frameCount % skipFrames !== 0 ||
        video.currentTime === video.duration
      ) {
        rafHandle.current = requestAnimationFrame(updateCanvas);
        return;
      }

      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      rafHandle.current = requestAnimationFrame(updateCanvas);
    };

    const handleVideoPlay = () => {
      rafHandle.current = requestAnimationFrame(updateCanvas);
    };
    const drawFrame = () => {
      // Ensure the last frame is drawn
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      cancelAnimationFrame(rafHandle.current);
    };
    const handleVideoLoadedData = () => {
      // Draw the first frame when the video is loaded
      drawFrame();
    };

    // video.addEventListener("play", handleVideoPlay);
    video.addEventListener("ended", drawFrame);
    video.addEventListener("play", drawFrame);
    // Clean up when component unmounts or video source changes
    return () => {
      // video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("ended", drawFrame);
      video.removeEventListener("play", drawFrame);
      cancelAnimationFrame(rafHandle.current);
    };
  }, [vdo]);

  let loadingTimeout = useRef(null);
  useEffect(() => {
    setShowLoading(false);
    setLoading(true);

    setCanFade(true);

    loadingTimeout.current = setTimeout(() => {
      setLoading((current) => {
        if (current != false) setShowLoading(true);
        return current;
      });
    }, 2000);

    return () => clearTimeout(loadingTimeout.current);
  }, [vdo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!play) {
      video.play();
      setPlay(true);
    }
  }, []);

  return (
    <>
      {/* <PrefetchVideos videoUrls={carouselUrls.carouselUrls} /> */}
      <div ref={containerRef} className="relative cursor-fancy overflow-hidden">
        <Fade />

        {interfaceUI&&<button
          onClick={handleFullscreen}
          className="fixed z-[13] top-0 right-0 p-2 rounded-bl-[18px] text-gray-200  bg-black"
        >
          {!fullscreen ? (
            <Fullscreen strokeWidth={1.2} size={23} />
          ) : (
            <Shrink strokeWidth={1.2} size={23} />
          )}
        </button>}
        <button
          className="fixed z-[13] bottom-0 left-0 p-2 rounded-tr-[18px] text-gray-200  bg-black"
          onClick={() => setInterfaceUI(!interfaceUI)}
        >
          {interfaceUI ? (
            <EyeOff strokeWidth={1.2} size={23} />
          ) : (
            <Eye strokeWidth={1.2} size={23} />
          )}
        </button>
        {interfaceUI && <Interface />}

        <Loading />

        {debugButton && (
          <button
            translate="no"
            className="fixed z-[21] bg-yellow-600"
            onClick={() => setDebug((prev) => !prev)}
          >
            {debug ? "View Realtime" : "View Debug"}
          </button>
        )}
        {/* <div className="fixed z-[21] top-10 bg-gray-300">{a.toString()}</div> */}
        <div className="relative w-screen  h-screen overflow-y-hidden">
          {a ? (
            <>
              <Image
                className={`aspect-video ${
                  debug ? "h-1/4 w-1/2" : "absolute  w-full"
                }`}
                priority={true}
                src="/a.webp"
                width={1920}
                key={"a"}
                height={1080}
                alt="background"
              />
            </>
          ) : null}
          <Panorama />
          <div
            className={`aspect-video ${debug ? " h-1/4 " : "absolute  w-full"}`}
          >
            <video
              muted
              ref={videoRef}
              key={1}
              width={1920}
              height={1080}
              // poster="image"
              className="w-full"
              src={vdo.path}
              type="video/mp4"
              autoPlay={play}
              loop={vdo.loop}
              preload="auto"
              controlsList="nodownload nofullscreen noremoteplayback"
              x5-playsinline="true"
              playsInline
              onSeeking={() => showA(false)}
              disablePictureInPicture
              webkit-playsinline="true"
              onLoadedData={() => {
                // setCanFade(false);
              }}
              onCanPlayThrough={() => {
                // setCanFade(false);
                setLoading(false);
                setShowLoading(false);
                clearTimeout(loadingTimeout.current);
              }}
              onPlaying={handlePlay}
              onEnded={handleDelayedVideoEnd}
            ></video>
          </div>
          <div className={`aspect-video ${debug ? "h-1/4" : "  w-full"}`}>
            <canvas
              className="w-full"
              ref={canvasRef}
              width={1920}
              height={1080}
            />
          </div>
          {b ? (
            <>
              <Image
                className={`aspect-video hidden ${
                  debug ? "h-1/4 w-1/2 " : "absolute z-[3] w-full"
                }`}
                key={"b"}
                src="/b.webp"
                width={1920}
                height={1080}
                alt="background"
              />
            </>
          ) : null}
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
      </div>
    </>
  );
}
