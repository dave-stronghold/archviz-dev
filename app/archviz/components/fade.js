import React, { useEffect } from "react";
import { FadeAtom } from "@/data/atoms";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";

export default function Fade() {
  const [fade, setFade] = useAtom(FadeAtom);

  useEffect(() => {
    const timeoutId = setTimeout(() => setFade(false), 400);
    return () => clearTimeout(timeoutId);
  }, [fade]);

  return (
    <AnimatePresence>
      {fade && (
        <motion.div
          initial={{ opacity: 1 }}
          // animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full bg-black z-50"
        />
      )}
    </AnimatePresence>
  );
}
