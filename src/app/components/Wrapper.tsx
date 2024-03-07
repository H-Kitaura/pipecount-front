import React from "react";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return (
    <div className="mx-auto w-full md:max-w-7xl max-w-2xl">{children}</div>
  );
};

export default Wrapper;
