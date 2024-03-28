import { style } from "@/app/styles/style";
import React from "react";

type Props = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const BigButton = ({ className, onClick, children }: Props) => {
  return (
    <button
      className={`${style.bigButtonContainer} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BigButton;
