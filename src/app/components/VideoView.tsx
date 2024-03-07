import React from "react";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoView = ({ videoRef }: Props) => {
  return (
    // <video ref={videoRef} width={400} height={300} autoPlay muted playsInline />
    <video ref={videoRef} autoPlay muted playsInline />
  );
};

export default VideoView;
