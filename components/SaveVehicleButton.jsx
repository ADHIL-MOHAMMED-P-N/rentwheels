"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
const SaveVehicleButton = ({ vehicle }) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  //on loading the page check ifsaved or not(by calling check route) , and set state
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    } //prevent calling the check route if not logged in (otherwise on loading the page it will throw 401 error)
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/save/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vehicleId: vehicle._id }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setIsSaved(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [vehicle._id, userId]);

  const handleSave = async () => {
    if (!userId) {
      toast.error("Sign In to Save vehicle");
      return;
    }
    try {
      const res = await fetch("/api/save", {
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

  if (loading) return <p className="text-center">Loading...</p>;

  return isSaved ? (
    <button
      onClick={handleSave}
      className="bg-color-red hover:bg-red-700 text-white font-bold w-full py-2 px-4  flex items-center justify-center"
    >
      <FaBookmark className="fas fa-share mr-2" /> Remove Bookmark
    </button>
  ) : (
    <>
      <button
        onClick={handleSave}
        className="hover:bg-color-red hover:text-white bg-white border text-color-red border-color-red  font-bold w-full py-2 px-4  flex items-center justify-center"
      >
        <FaBookmark className="fas fa-share mr-2" /> Bookmark Vehicle
      </button>
    </>
  );
};

export default SaveVehicleButton;
