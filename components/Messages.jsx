"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Message from "@/components/Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const messagesData = await res.json();
          setMessages(messagesData);
        }
      } catch (error) {
        console.log("Error on loading messages", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((item) => <Message key={item._id} message={item} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;