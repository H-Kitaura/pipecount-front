import { AiOutlineClose } from "react-icons/ai";

type ModalButtonProps = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const CloseIconButton = ({ onClose }: { onClose: () => void }) => (
  <button className={"text-gray-600"} onClick={onClose}>
    <AiOutlineClose />
  </button>
);
export const CloseButton = ({
  onClose,
  children,
  className,
}: ModalButtonProps) => (
  <button className={`${className} px-4 py-2`} onClick={onClose}>
    {children}
  </button>
);
