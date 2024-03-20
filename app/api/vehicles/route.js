import connectDB from "@/config/db";
import Vehicle from "@/models/Vehicle";
//GET /api/vehicles
export const GET = async (request) => {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({});
    return new Response(JSON.stringify(vehicles), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};
