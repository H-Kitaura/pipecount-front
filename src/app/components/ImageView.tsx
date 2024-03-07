import React from "react";
import { style } from "../styles/style";

type Props = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const ImageView = ({ image, setImage, setMode }: Props) => {
  const handleImage = () => {
    //ここでapi送信
    setMode("canvas");
  };
  const imageCancel = () => {
    setImage("");
    setMode("video");
  };

  return (
    <div className="">
      <img src={image} alt="image" className="w-[400px] h-[300px]" />
      <div className="flex items-center justify-center space-x-4 mt-2">
        <button onClick={handleImage} className={`${style.buttonLayout} px-2 `}>
          送信
        </button>
        <button onClick={imageCancel} className={`${style.buttonLayout} px-2 `}>
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default ImageView;
