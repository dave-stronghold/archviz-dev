import React, { useEffect } from "react";
import { FadeAtom, readyToFadeAtom } from "@/data/atoms";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";

export default function Fade() {
  const [fade, setFade] = useAtom(FadeAtom);
  const [canFade] = useAtom(readyToFadeAtom);
  useEffect(() => {
    // const timeoutId = setTimeout(() => setFade(false), 600);
    // return () => {
    //   clearTimeout(timeoutId);

    // };
    if (canFade) {
      setFade(false);
    }
  }, [canFade, setFade]);

  return (
    <AnimatePresence>
      {fade && (
        <motion.div
          initial={{ opacity: 1 }}
          // animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full bg-black z-50"
        />
      )}
    </AnimatePresence>
  );
}
