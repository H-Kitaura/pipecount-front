import React from "react";
import { CloseIconButton } from "./button/CloseButton";

type ModalOverlayProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};
type ModalContainerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

type ModalHeaderProps = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const ModalOverlay = ({
  children,
  isOpen,
  onClose,
  className,
}: ModalOverlayProps) => {
  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className={`${className} fixed top-0 left-0 h-screen w-full flex justify-center items-center modal-overlay z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleModalClick}
      style={{ transition: "opacity 0.3s ease" }}
    >
      {children}
    </div>
  );
};

export const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const defaultStyle = "bg-white p-4 rounded-lg max-w-md w-full";

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // モーダルコンテンツのクリックイベントが伝播しないようにする
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 }`}
      onClick={onClose}
    >
      <div
        className={className ? `${className} relative` : defaultStyle}
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  onClose,
  children,
  className,
}) => {
  const defaultStyle = "flex itmes-center justify-between border-b p-2";
  return (
    <div className={className ? `${className} relative` : defaultStyle}>
      {children}
      <div className="absolute top-0 right-0">
        <CloseIconButton onClose={onClose} />
      </div>
    </div>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
}) => {
  const defaultStyle = "p-2";
  return (
    <div className={className ? `${className}` : defaultStyle}>{children}</div>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  const defaultStyle = "p-2 border-t";

  return (
    <div className={className ? `${className}` : defaultStyle}>{children}</div>
  );
};
