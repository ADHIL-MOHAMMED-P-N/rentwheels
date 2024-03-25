//newmessages = unreadmessages(checking read field in db)
"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
const NewMessageCount = ({ session }) => {
  const { count, setCount } = useGlobalContext();
  useEffect(() => {
    if (!session) return;

    const fetchNewMessageCount = async () => {
      try {
        const res = await fetch("/api/messages/new-message-count");

        if (res.status === 200) {
          const count = await res.json(); //in api , returning count(not count obj)
          setCount(count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewMessageCount();
  }, [session]);
  return (
    count > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {count}
      </span>
    )
  );
};

export default NewMessageCount;
