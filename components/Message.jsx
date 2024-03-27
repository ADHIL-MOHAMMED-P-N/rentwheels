"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import profileDefaultImg from "@/assets/images/profile.png";
import Link from "next/link";
import Image from "next/image";
const Message = ({ message }) => {
  const [read, setRead] = useState(message.read);
  const [isDelete, setIsDelete] = useState(false); //to conditionally render the message based on delted or not
  const { setCount } = useGlobalContext();
  const handleRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const data = await res.json();
        setRead(data.read);
        setCount((pre) => (data.read ? pre - 1 : pre + 1));
        if (data.read) {
          //should be data.read not read(state) since its asyn(may chack if condition before setRead > reult in opposte toast)
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDelete(true);
        setCount((pre) => pre - 1);
        //setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message is Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Message not deleted");
    }
  };
  if (isDelete) return null; //so delted elemnt won't render
  return (
    <div className="relative bg-white p-4  shadow border border-gray-200">
      {/* new tag if read=false */}
      {!read && (
        <div className="absolute top-2 right-2 bg-green-400 text-white px-2 py-1 ">
          New
        </div>
      )}
      <Link href={`/vehicles/${message.vehicle._id}`}>
        <h2 className="text-xl mb-4 font-semibold hover:text-color-red">
          {message.vehicle.name}
        </h2>
      </Link>
      <p className="text-gray-700">{message.messageContent}</p>

      <ul className="mt-4 text-sm">
        <li className="text-base font-semibold">
          <Image
            className="h-6 w-6 rounded-full inline mr-2 mb-1 "
            src={message.sender.image || profileDefaultImg}
            alt="Profile Image"
            width={40}
            height={40}
          />
          {message.sender.username}
        </li>

        <li>
          <strong>
            <MdEmail className="inline text-gray-400" /> :{" "}
          </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>
            <FaPhoneAlt className="inline text-gray-400" /> :{" "}
          </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>
            <IoTime className="inline text-gray-400" /> :{" "}
          </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className={`mt-4 mr-3 ${
          read ? "bg-gray-200 " : "bg-blue-500 text-white"
        }   py-1 px-3 `}
      >
        {read ? "Mark as new" : "Mark as read"}{" "}
        <FaEye
          className={`${read ? "text-black" : "text-white"} inline mb-1 ml-1`}
        />
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 "
      >
        Delete <MdDelete className="text-white inline mb-1" />
      </button>
    </div>
  );
};

export default Message;
