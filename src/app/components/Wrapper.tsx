import React from "react";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return (
    <div className="mx-auto h-full w-full md:min-w-7xl min-w-2xl">
      {children}
    </div>
  );
};

export default Wrapper;
