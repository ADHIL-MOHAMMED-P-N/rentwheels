//route to check is the vehicle is bookmarked or not on loading the singelVehiclePage
//similary to save route, but we are only checking if the vehicle is saved or not.
import connectDB from "@/config/db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic =
  "force-dynamic"; /* route segment config(nexjs) : bug fix in deployment */

//its post since it is takng the vehicleid
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

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
