"use client";

import BgGradient from "@/components/common/bg-gradient";
import React from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <BgGradient />
      <GridLoader color="oklch(0.645 0.246 16.439)" loading={true} />
    </div>
  );
};

export default Loading;
