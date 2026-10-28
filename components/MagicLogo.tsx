"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MagicLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* L'Logo b7al li f l'wesat (bla cercles) */}
      <motion.div
        animate={{
          rotateY: [0, 360], // Rotation 3D
          scaleX: [1, 1.1, 0.95, 1.05, 1], // Heartbeat / Squash
          scaleY: [1, 0.9, 1.05, 0.95, 1], // Heartbeat / Stretch
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
          scaleX: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          scaleY: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-12 h-12 z-10"
        style={{
          filter: "drop-shadow(0 0 15px rgba(6,182,212,0.8))", // Glow khfif
        }}
      >
        <Image
          src="/logo-estk.png"
          alt="EST-K 360"
          fill
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
