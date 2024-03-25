import connectDB from "@/config/db";
import Vehicle from "@/models/Vehicle";
import cloudinary from "@/config/cloudinary";

import { getSessionUser } from "@/utils/getSessionUser";
//GET /api/vehicles
export const GET = async (request) => {
  try {
    await connectDB();
    //pagination
    //page>which page you on,//pageSize = howmany vehicles on one page
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6; //change pagesize manually accordingly

    const skip = (page - 1) * pageSize; //starting pos of eachpage
    const totalVehicles = await Vehicle.countDocuments({});
    //logic> totalVehicles/pageSize = no of pages
    const vehicles = await Vehicle.find({}).skip(skip).limit(pageSize);

    const result = { totalVehicles, vehicles };
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserId is required, unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;

    const formData = await request.formData();
    //get all features and images
    const features = formData.getAll("features");
    const images = formData.getAll("images");

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
      //images,
    };

    //upload imges to cloudinary

    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      //convert imagedata to base64;
      const imageBase64 = imageData.toString("base64");
      //request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "rentwheels",
        }
      );
      imageUploadPromises.push(result.secure_url);
      //wait for all image to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      //add uploadedimages to vehicledata
      vehicleData.images = uploadedImages;
    }

    //saving to db
    const newVehicle = new Vehicle(vehicleData);
    await newVehicle.save();
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/vehicles/${newVehicle._id}`
    );

    /* return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    }); */
  } catch (err) {
    return new Response("failed to add new vehicle", { status: 500 });
  }
};
