import connectDB from "@/config/db";
import Vehicle from "@/models/Vehicle";
// GET /api/vehicles/search
export const GET = async (request) => {
  try {
    await connectDB();
    //extracting queryParams
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const type = searchParams.get("type");

    //regular expression for searching whenever location/keyword is typed in field(location field)
    const locationPattern = new RegExp(location, "i"); //option 'i' for case insensitivity

    // Match if location pattern with database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.pincode": locationPattern },
      ],
    };

    // Only check for vehicle if its not 'All' type field
    //regx for type
    if (type && type !== "All") {
      const typePattern = new RegExp(type, "i");
      query.type = typePattern;
    }

    const vehicles = await Vehicle.find(query);
    return new Response(JSON.stringify(vehicles), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Search Failed", { status: 500 });
  }
};
