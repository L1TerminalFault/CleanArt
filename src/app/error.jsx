"use client";

import { FaCogs } from "react-icons/fa";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error caught in boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] w-full items-center justify-center">
      <FaCogs color="gray" size={54} />
      <div className="text-gray-500 text-lg">Something went wrong</div>
      <div className="text-gray-600 text-xs md:text-sm max-w-[50%] my-2">
        Make sure you are connected to the internet. If the issue persists, feel
        free to report it.
      </div>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 hover:bg-purple-600 transition-all bg-purple-700 text-white rounded-full"
      >
        Try Again
      </button>
    </div>
  );
}
