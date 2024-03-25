import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic"; //for deployment

//get all messages
// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User ID is needed"), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    //seperating the readMessages and unreadmessages, so it can be sorted(unread first)
    const readMessages = await Message.find({ receiver: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("vehicle", "name"); //picking fields from ref Model
    const unreadMessages = await Message.find({ receiver: userId, read: false })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("vehicle", "name");
    const messages = [...unreadMessages, ...readMessages]; //unread sorted first

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//sending messages
// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, vehicle, receiver } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "Login to send message" }),
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === receiver) {
      return new Response(
        JSON.stringify({ message: "Cannot send a message to yourself" }),
        { status: 400 } //if want to use the error message(show on ui etc): send it as like this(json),otherwise send normal string Response
      );
    }

    const newMessage = new Message({
      sender: user.id,
      receiver,
      vehicle,
      name,
      email,
      phone,
      messageContent: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message Sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
