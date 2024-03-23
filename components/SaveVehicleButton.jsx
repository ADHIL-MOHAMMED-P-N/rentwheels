"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
const SaveVehicleButton = ({ vehicle }) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!userId) {
      toast.error("Sign In to Save vehicle");
      return;
    }
    try {
      const res = await fetch("/api/save/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId: vehicle._id }),
      });
      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message); //from route.js backend
        setIsSaved(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookmark className="fas fa-share mr-2" /> Bookmark Vehicle
      </button>
    </>
  );
};

export default SaveVehicleButton;
