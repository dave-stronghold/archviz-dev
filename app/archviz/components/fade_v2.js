import React, { useEffect } from "react";
import { FadeAtom } from "@/data/atoms";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";

export default function Fade() {
  const [fade, setFade] = useAtom(FadeAtom);

  useEffect(() => {
    let timeoutId;
    if (fade) {
      console.log("Effect invoked"); // Debugging line
      timeoutId = setTimeout(() => setFade(false), 100);
    }
    return () => clearTimeout(timeoutId);
  }, [fade, setFade]);

  console.log("Rendered"); // Debugging line

  return (
    <AnimatePresence>
      {fade && (
        <motion.div
          initial={{ opacity: 1 }}
          // animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-black z-50"
        />
      )}
    </AnimatePresence>
  );
}
