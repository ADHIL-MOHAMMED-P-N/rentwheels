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

//PUT /api/vehicles/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserId is required, unauthorized", { status: 401 });
    }
    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();
    //get all features and images
    const features = formData.getAll("features");

    //get vehicle to edit
    const currentVehicle = await Vehicle.findById(id);
    if (!currentVehicle) {
      return new Response("Vehicle does not exists", { status: 401 });
    }

    //verifying ownership : if user is not owner of the vehicle prevent editing
    if (currentVehicle.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //create vehicle obj to add to db

    const vehicleData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        pincode: formData.get("location.pincode"),
      },
      number_of_seats: formData.get("number_of_seats"),
      gear: formData.get("gear"),
      fuel: formData.get("fuel"),
      features,
      rates: {
        hourly: formData.get("rates.hourly"),
        daily: formData.get("rates.daily"),
      },
      seller: {
        name: formData.get("seller.name"),
        email: formData.get("seller.email"),
        phone: formData.get("seller.phone"),
      },
      owner: userId,
    };

    //update vehicle in db and edit
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicleData);

    return new Response(JSON.stringify(updatedVehicle), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("failed to add new vehicle", { status: 500 });
  }
};
