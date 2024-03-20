import connectDB from "@/config/db";
import Vehicle from "@/models/Vehicle";
//GET /api/vehicles/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const vehicle = await Vehicle.findById(params.id);
    if (!vehicle) return new Response("Vehicle Not Found", { status: 404 });
    return new Response(JSON.stringify(vehicle), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};
