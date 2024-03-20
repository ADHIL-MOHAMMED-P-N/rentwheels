"use client";
import { PulseLoader } from "react-spinners";

const LoadingPage = ({ loading }) => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <PulseLoader color="#3b82f6" loading={loading} size={20} />
    </div>
  );
};

export default LoadingPage;
