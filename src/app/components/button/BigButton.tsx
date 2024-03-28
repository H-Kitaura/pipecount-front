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
      className={`shadow border py-2 px-4 text-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BigButton;
