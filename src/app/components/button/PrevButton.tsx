import { style } from "@/app/styles/style";
import React from "react";

const PrevButton = () => {
  return (
    <button
      className={`${style.buttonLayout} w-1/5 flex items-center justify-center h-[40px]`}
    >
      <p className="text-center">前へ</p>
    </button>
  );
};

export default PrevButton;
