import { AnimatePresence, motion } from "framer-motion";
import { vdoAtom, loadingAtom, sceneAtom } from "@/data/atoms";

import { useAtom } from "jotai";
import { Loader2Icon } from "lucide-react";
export default function Loading() {
  const [loading] = useAtom(loadingAtom);
  const [vdo] = useAtom(vdoAtom);
  const [scene] = useAtom(sceneAtom);
  return (
    <AnimatePresence>
      {/* {console.log(vdo.loop, loading)} */}
      {loading && !vdo.loop && (
        <motion.div
          key={vdo.src}
          initial={{ y: -100, x: "-50%" }}
          animate={{ y:  0, x: "-50%" }}
          exit={{ y: -100, x: "-50%" }}
          className="fixed z-[21] flex items-center gap-2 -translate-x-1/2 left-1/2 bg-black rounded-md px-3 text-gray-300 py-1 text-sm top-6"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Loader2Icon className="text-orange-400" size={18} />
          </motion.div>
          <div>Slow Connection</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
