import React, { useEffect, useState } from "react";
import ImageView from "./ImageView";
import CanvasView from "./CanvasView";
import VideoView from "./VideoView";
import { Annotation } from "../schemas/type";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  cordinatesDisplay: boolean;
  setCordinatesDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  pointSize: number;
  cameraCheck: boolean;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const MainImageDisplay = ({
  videoRef,
  canvasRef,
  mode,
  setMode,
  size,
  cordinatesDisplay,
  setCordinatesDisplay,
  pointSize,
  cameraCheck,
  annotation,
  setAnnotation,
}: Props) => {
  // useEffect(() => {
  //   if (videoRef.current) {
  //     setSize({
  //       width: videoRef.current.videoWidth,
  //       height: videoRef.current.videoHeight,
  //     });
  //   }
  // }, [videoRef]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <VideoView
        videoRef={videoRef}
        mode={mode}
        setMode={setMode}
        size={size}
        cameraCheck={cameraCheck}
        setAnnotation={setAnnotation}
      />
      {mode === "image" && (
        <ImageView
          setMode={setMode}
          size={size}
          annotation={annotation}
          setAnnotation={setAnnotation}
        />
      )}
      {mode === "canvas" && (
        <CanvasView
          videoRef={videoRef}
          canvasRef={canvasRef}
          size={size}
          cordinatesDisplay={cordinatesDisplay}
          setCordinatesDisplay={setCordinatesDisplay}
          pointSize={pointSize}
          annotation={annotation}
          setAnnotation={setAnnotation}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default MainImageDisplay;
