import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { panoramaAtom, showPanoramaAtom,interfaceUIAtom } from "@/data/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { SidebarClose } from "lucide-react";
export default function Panorama() {
  const [panorama] = useAtom(panoramaAtom);
  const [showPanorama, setShowPanorama] = useAtom(showPanoramaAtom);
  const[showInterface]=useAtom(interfaceUIAtom)
  return (
    <AnimatePresence>
      { (
        <>
          <div
            key={"1"}
            className={`absolute z-[12] w-dvw transition-opacity duration-500 ${showPanorama?'opacity-100  ':'opacity-0 invisible '}`}
          >
            <ReactPhotoSphereViewer
              src={panorama}
              height={"100vh"}
              width={"100%"}
              navbar={false}
            ></ReactPhotoSphereViewer>
          </div>
         
          {showPanorama &&showInterface&&(<motion.div
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
                setShowPanorama(false);
              }}
              className={`bg-black p-2 rounded-[12px] text-gray-300 hover:text-gray-50`}
            >
              <SidebarClose strokeWidth={1.2} />
            </div>
          </motion.div>)}
        </>
      )}
    </AnimatePresence>
  );
}
