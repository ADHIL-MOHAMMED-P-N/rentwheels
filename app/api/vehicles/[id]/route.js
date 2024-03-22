import connectDB from "@/config/db";
import Vehicle from "@/models/Vehicle";
import { getSessionUser } from "@/utils/getSessionUser";
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

//DELETE /api/vehicles/:id
export const DELETE = async (request, { params }) => {
  try {
    const vehicleId = params.id;
    const sessionUser = await getSessionUser();
    //checking session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id required", { status: 401 });
    }
    const { userId } = sessionUser;

    await connectDB();
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return new Response("Vehicle Not Found", { status: 404 });

    //verifying ownership : if user is not owner of the vehicle prevent deleting
    if (vehicle.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    //deleting
    await vehicle.deleteOne();

    return new Response("Vehicle Delted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};
