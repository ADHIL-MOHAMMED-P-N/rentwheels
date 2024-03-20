import connectDB from "@/config/db";
export const GET = async (request) => {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: "Hello" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};
