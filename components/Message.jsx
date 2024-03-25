"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Message = ({ message }) => {
  const [read, setRead] = useState(message.read);
  const handleRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const data = await res.json();
        setRead(data.read);
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
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {/* new tag if read=false */}
      {!read && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Vehice Inquiry: </span>
        {message.vehicle.name}
      </h2>
      <p className="text-gray-700">{message.messageContent}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className={`mt-4 mr-3 ${
          read ? "bg-gray-200 " : "bg-blue-500 text-white"
        }   py-1 px-3 rounded-md`}
      >
        {read ? "Mark as new" : "mark as read"}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
};

export default Message;
