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
    <div className="flex justify-end items-end w-full px-4 mt-4">
      <button onClick={handleCordinates}>
        <p className="border shadow-md px-2 py-1">
          {cordinatesDisplay ? "座標を非表示する" : "座標を表示する"}
        </p>
      </button>
    </div>
  );
};

export default CordinatesButton;
