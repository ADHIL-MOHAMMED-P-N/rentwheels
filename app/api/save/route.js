import connectDB from "@/config/db";
import User from "@/models/User";
import Vehicle from "@/models/Vehicle";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic =
  "force-dynamic"; /* route segment config(nexjs) : bug fix in deployment */

//for fetching in saved vehicle page
//GET api/save

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Get users bookmarks/saved vehicles
    const bookmarks = await Vehicle.find({ _id: { $in: user.bookmarks } }); //looking in users bookmark array in db > see vehicle that matches _id in Vehicle model and takes them

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed", { status: 500 });
  }
};

//for saving the vehicle
//POST api/save
export const POST = async (request) => {
  try {
    await connectDB();

    const { vehicleId } = await request.json(); //taking the vehicleid from requestbody , becuase we can't take it from params since we are not padding params in route

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if vehicle is already bookmarked/saved
    let isBookmarked = user.bookmarks.includes(vehicleId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(vehicleId);
      message = "Vehicle unsaved successfully";
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(vehicleId);
      message = "Vehcle saved successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
