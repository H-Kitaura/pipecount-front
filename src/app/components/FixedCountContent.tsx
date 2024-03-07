import React from "react";

type Props = {
  countData: number;
  setCountData: React.Dispatch<React.SetStateAction<number>>;
};

const FixedCountContent = ({ countData, setCountData }: Props) => {
  const [fixCount, setFixCount] = React.useState(countData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value);
    setFixCount(newCount);
  };
  const handleIncrement = () => {
    setFixCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setFixCount((prevCount) => prevCount - 1);
  };
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <label htmlFor="count" className="mb-2">
        訂正数
      </label>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 shadow-md bg-white border"
        >
          -
        </button>
        <input
          type="number"
          id="count"
          value={fixCount}
          onChange={handleChange}
          className="border py-2 shadow-md text-center mx-2"
        />
        <button
          onClick={handleIncrement}
          className="px-4 py-2 shadow-md bg-white border"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FixedCountContent;
