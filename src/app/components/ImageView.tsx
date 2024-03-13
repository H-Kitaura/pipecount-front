import React from "react";
import { style } from "../styles/style";
import RetakephotoButton from "./button/RetakephotoButton";
import SendButton from "./button/SendButton";

type Props = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  setPoints: React.Dispatch<React.SetStateAction<any>>;
};

const ImageView = ({ image, setImage, setMode, size, setPoints }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <img src={image} className="w-full h-auto" alt="image" />
      <div className="flex items-center justify-center w-full space-x-4 my-4">
        <RetakephotoButton
          setMode={setMode}
          setImage={setImage}
          setPoints={setPoints}
        />
        <SendButton setMode={setMode} />
      </div>
    </div>
  );
};

export default ImageView;
