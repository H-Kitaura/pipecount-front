"use client";
import React from "react";
import VideoConnection from "./button/VideoConnection";

type Props = {
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ cameraCheck, setCameraCheck }: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-2xl">PIPE COUNT</p>
      <VideoConnection
        cameraCheck={cameraCheck}
        setCameraCheck={setCameraCheck}
      />
    </div>
  );
};

export default Header;
