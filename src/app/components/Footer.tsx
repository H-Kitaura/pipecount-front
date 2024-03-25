import React from "react";
import PhotoButton from "./button/PhotoButton";
import PrevButton from "./button/PrevButton";
import NextButton from "./button/NextButton";
import ReportButton from "./button/ReportButton";
import { Annotation } from "../schemas/type";
import { style } from "../styles/style";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setTotalCounts: React.Dispatch<React.SetStateAction<number[]>>;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const Footer = ({
  videoRef,
  mode,
  setMode,
  setTotalCounts,
  annotation,
  setAnnotation,
}: Props) => {
  return (
    <div className="flex items-center justify-center w-full px-4 pb-12 space-x-4">
      <PhotoButton
        videoRef={videoRef}
        mode={mode}
        setMode={setMode}
        setAnnotation={setAnnotation}
      />
      {mode === "canvas" && (
        <>
          <NextButton
            annotation={annotation}
            setAnnotation={setAnnotation}
            setTotalCounts={setTotalCounts}
            setMode={setMode}
          />
          <ReportButton
            setMode={setMode}
            setTotalCounts={setTotalCounts}
            annotation={annotation}
            setAnnotation={setAnnotation}
          />
        </>
      )}
    </div>
  );
};

export default Footer;
