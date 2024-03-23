import connectDB from "@/config/db";
import Vehicle from "@/models/Vehicle";

//GET /api/vehicles/user/:userid
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId; //foldername=userId

    if (!userId) {
      return new Response("User ID requires", { status: 400 });
    }

    const vehicles = await Vehicle.find({ owner: userId });

    return new Response(JSON.stringify(vehicles), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};
