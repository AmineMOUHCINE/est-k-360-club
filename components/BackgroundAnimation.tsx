"use client";
import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            backgroundImage: "url('/logo-estk.png')",
            backgroundSize: "60%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 0 80px rgba(52,211,153,0.3))",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#1B2550]/60" />
    </div>
  );
}
