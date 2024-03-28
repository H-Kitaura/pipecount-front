import { style } from "@/app/styles/style";
import React from "react";

type Props = {
  cordinatesDisplay: boolean;
  setCordinatesDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const CordinatesButton = ({
  cordinatesDisplay,
  setCordinatesDisplay,
}: Props) => {
  const handleCordinates = () => {
    setCordinatesDisplay(!cordinatesDisplay);
  };

  return (
    <div className="flex justify-end items-end w-full px-4">
      <button
        className={`${style.buttonLayout} bg-white hover:bg-slate-200 mt-1`}
        onClick={handleCordinates}
      >
        <p className="px-2a py-1a">
          {cordinatesDisplay ? "座標を非表示する" : "座標を表示する"}
        </p>
      </button>
    </div>
  );
};

export default CordinatesButton;
