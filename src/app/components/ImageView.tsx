import React from "react";
import { style } from "../styles/style";

type Props = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
};

const ImageView = ({ image, setImage, setMode, size }: Props) => {
  const handleImage = () => {
    //ここでapi送信
    setMode("canvas");
  };
  const imageCancel = () => {
    setImage("");
    setMode("video");
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-col mt-8a">
      <img src={image} className="w-full h-auto" alt="image" />
      <div className="flex items-center justify-center space-x-4 my-4">
        <button
          onClick={handleImage}
          className={`${style.buttonLayout} py-1 px-2 `}
        >
          送信
        </button>
        <button
          onClick={imageCancel}
          className={`${style.buttonLayout} py-1 px-2 `}
        >
          再撮影
        </button>
      </div>
    </div>
  );
};

export default ImageView;
