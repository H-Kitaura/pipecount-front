import { style } from "@/app/styles/style";
import React from "react";

const ReportButton = () => {
  return (
    <button
      className={`${style.buttonLayout} w-2/5 flex items-center justify-center h-[40px]`}
    >
      <p className="text-center">訂正送信</p>
    </button>
  );
};

export default ReportButton;
