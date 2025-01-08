import React from "react";
import { twMerge } from "tailwind-merge";

const Loader = ({ className, color }) => {
  return (
    <div
      style={{ borderColor: color }}
      className={twMerge(
        `inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] items-center justify-center opacity-100`,
        className
      )}
    ></div>
  );
};

export default Loader;
