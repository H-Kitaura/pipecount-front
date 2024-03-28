import React from "react";
import PhotoButton from "./button/PhotoButton";
import NextButton from "./button/NextButton";
import ReportButton from "./button/ReportButton";
import { Annotation, Feedback } from "../schemas/type";
import RetakephotoButton from "./button/RetakephotoButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setTotalCounts: React.Dispatch<React.SetStateAction<number[]>>;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
  feedBack: Feedback;
  setFeedBack: React.Dispatch<React.SetStateAction<Feedback>>;
};

const Footer = ({
  videoRef,
  mode,
  setMode,
  setTotalCounts,
  annotation,
  setAnnotation,
  feedBack,
  setFeedBack,
}: Props) => {
  return (
    <>
      {mode === "canvas" && (
        <div className="w-full px-2 pb-12 pt-6">
          <>
            <div className="w-full flex items-center justify-center gap-4">
              <RetakephotoButton
                setMode={setMode}
                setAnnotation={setAnnotation}
              />
              <NextButton
                annotation={annotation}
                setAnnotation={setAnnotation}
                setTotalCounts={setTotalCounts}
                setMode={setMode}
              />
            </div>
            <ReportButton
              setMode={setMode}
              setTotalCounts={setTotalCounts}
              annotation={annotation}
              setAnnotation={setAnnotation}
              feedBack={feedBack}
              setFeedBack={setFeedBack}
            />
          </>
        </div>
      )}
    </>
  );
};

export default Footer;
