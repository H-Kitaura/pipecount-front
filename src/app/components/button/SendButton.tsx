import { style } from "@/app/styles/style";
import React from "react";

type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const SendButton = ({ setMode }: Props) => {
  const handleImage = () => {
    //ここでapi送信
    setMode("canvas");
  };

  return (
    <button
      onClick={handleImage}
      className={`${style.buttonLayout} py-2 px-4 w-1/2 `}
    >
      送信
    </button>
  );
};

export default SendButton;
