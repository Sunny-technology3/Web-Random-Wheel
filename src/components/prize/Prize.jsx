import React from "react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./prize.css";
import Confetti from "react-confetti";

const overlay = {
  hide: {
    opacity: 0,
    backgroundColor: "unset",
  },
  visible: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    transition: {
      delay: 0.5,
      duration: 0.4,
      when: "beforeChildren",
    },
  },
};

const box = {
  hide: {
    y: "-100vh",
  },

  visible: {
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

export default function Prize({ back, prize }) {
  const [showConfetti, setShowConfetti] = useState(false);

  React.useEffect(() => {
    setShowConfetti(true);
  }, []);

  const goBack = () => {
    back(false);
    setShowConfetti(false);
  };

  return (
    <AnimatePresence>
      {showConfetti && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 999 }}>
          <Confetti recycle={true} numberOfPieces={200} />
        </div>
      )}

      <motion.div
        className="prize"
        variants={overlay}
        initial="hide"
        animate="visible"
        exit="hide"
        style={{ zIndex: 998 }}
      >
        <motion.div className="prize_content" variants={box}>
          <h2>Congratulations</h2>

          <p>
            Bạn nhận được một phần quà <span>{prize}</span>.
          </p>

          <div className="prize_content_buttons">
            <button onClick={goBack}>Xác nhận</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}