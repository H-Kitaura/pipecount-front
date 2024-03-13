import React, { useEffect } from "react";
import ImageView from "./ImageView";
import CanvasView from "./CanvasView";
import VideoView from "./VideoView";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  setSize: React.Dispatch<React.SetStateAction<any>>;
  cordinatesDisplay: boolean;
  setCordinatesDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  points: any;
  setPoints: React.Dispatch<React.SetStateAction<any>>;
  pointSize: number;
  cameraCheck: boolean;
};

const MainImageDisplay = ({
  videoRef,
  canvasRef,
  mode,
  setMode,
  image,
  setImage,
  size,
  setSize,
  cordinatesDisplay,
  setCordinatesDisplay,
  points,
  setPoints,
  pointSize,
  cameraCheck,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center my-4 px-4">
      {/* <div className="w-full h-full border shadow-md flex items-center justify-center"> */}
      {/* {mode === "video" && ( */}
      <VideoView
        videoRef={videoRef}
        setImage={setImage}
        mode={mode}
        setMode={setMode}
        size={size}
        setSize={setSize}
        cameraCheck={cameraCheck}
      />

      {/* )} */}
      {mode === "image" && (
        <ImageView
          image={image}
          setImage={setImage}
          setMode={setMode}
          size={size}
          setPoints={setPoints}
        />
      )}
      {mode === "canvas" && (
        <CanvasView
          videoRef={videoRef}
          canvasRef={canvasRef}
          image={image}
          size={size}
          cordinatesDisplay={cordinatesDisplay}
          setCordinatesDisplay={setCordinatesDisplay}
          points={points}
          setPoints={setPoints}
          pointSize={pointSize}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default MainImageDisplay;
