import React from "react";
import { Portal } from "../portal/Portal";
import { useKeyPress } from "../../hooks/useKeyPress";
import { usePreventBodyScroll } from "../../hooks/usePreventBodyScroll";
import { Modal as AntModal } from "antd";

interface ModalProps {
  title: string;
  okText?: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onOk,
  onClose,
  okText,
  title,
  children,
}) => {
  usePreventBodyScroll(true);
  useKeyPress("Escape", onClose);

  return (
    <Portal>
      <AntModal
        onOk={onOk}
        open={true}
        okText={okText}
        onCancel={onClose}
        title={title}
      >
        {children}
      </AntModal>
    </Portal>
  );
};

export default Modal;
