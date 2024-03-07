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
};

const MainImageDisplay = ({
  videoRef,
  canvasRef,
  mode,
  setMode,
  image,
  setImage,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="h-[400px]a w-[400px]a border shadow-md flex items-center justify-center bg-gray-400">
        {mode === "video" && (
          <VideoView
            videoRef={videoRef}
            setImage={setImage}
            mode={mode}
            setMode={setMode}
          />
        )}
        {mode === "image" && (
          <ImageView image={image} setImage={setImage} setMode={setMode} />
        )}
        {mode === "canvas" && (
          <CanvasView videoRef={videoRef} canvasRef={canvasRef} image={image} />
        )}
      </div>
    </div>
  );
};

export default MainImageDisplay;
