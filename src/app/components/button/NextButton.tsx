import React from "react";
import { style } from "@/app/styles/style";
import { Annotation } from "@/app/schemas/type";

type Props = {
  setTotalCounts: React.Dispatch<React.SetStateAction<number[]>>;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const NextButton = ({
  setTotalCounts,
  annotation,
  setAnnotation,
  setMode,
}: Props) => {
  const hanldleSubmit = () => {
    setMode("video");
    setTotalCounts((prev) => [...prev, annotation.points.length]);
    setAnnotation((prev) => ({
      ...prev,
      points: [],
    }));
  };
  return (
    <button
      onClick={hanldleSubmit}
      className={`${style.buttonLayout} w-1/2 flex items-center justify-center h-[40px]`}
    >
      <p className="text-center">次の撮影</p>
    </button>
  );
};

export default NextButton;
