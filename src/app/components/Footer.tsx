import React from "react";
import PhotoButton from "./button/PhotoButton";
import PrevButton from "./button/PrevButton";
import NextButton from "./button/NextButton";
import ReportButton from "./button/ReportButton";

const Footer = () => {
  return (
    <div className="flex items-center w-full">
      <PhotoButton />
      <PrevButton />
      <NextButton />
      <ReportButton />
    </div>
  );
};

export default Footer;
