import { style } from "@/app/styles/style";
import React, { useState } from "react";
import RetakephotoButton from "./RetakephotoButton";
import { Annotation } from "@/app/schemas/type";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const PhotoButton = ({ videoRef, mode, setMode, setAnnotation }: Props) => {
  return (
    <>
      {mode === "canvas" && (
        <RetakephotoButton setMode={setMode} setAnnotation={setAnnotation} />
      )}
    </>
  );
};

export default PhotoButton;
