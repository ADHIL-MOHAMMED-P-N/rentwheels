import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
//for updatng markasread for single message
// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = params; //name of folder = id
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const message = await Message.findById(id);
    if (!message) return new Response("Message Not Found", { status: 404 });

    // Verify ownership(otherwise anyone can chagen msg)
    if (message.receiver.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //toggling message status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
