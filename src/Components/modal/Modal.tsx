import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "../portal/Portal";
import styles from "./Modal.module.css";
import { useKeyPress } from "../../hooks/useKeyPress";
import { usePreventBodyScroll } from "../../hooks/usePreventBodyScroll";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: { y: "0%", opacity: 1, transition: { duration: 0.3 } },
  hidden: { y: "-50%", opacity: 0 },
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  usePreventBodyScroll(true);
  useKeyPress("Escape", onClose);

  return (
    <Portal>
      <AnimatePresence>
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
