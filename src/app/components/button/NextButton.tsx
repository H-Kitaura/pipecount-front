import React from "react";
import { style } from "@/app/styles/style";

const NextButton = () => {
  return (
    <button
      className={`${style.buttonLayout} w-1/5 flex items-center justify-center h-[40px]`}
    >
      <p className="text-center">次へ</p>
    </button>
  );
};

export default NextButton;
