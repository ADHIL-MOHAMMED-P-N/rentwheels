"use client";
import { PulseLoader } from "react-spinners";

const LoadingPage = ({ loading }) => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <PulseLoader color="#DA0A2E" loading={loading} size={20} />
    </div>
  );
};

export default LoadingPage;
