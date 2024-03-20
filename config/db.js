import mongoose, { mongo } from "mongoose";
const connectDB = async () => {
  let connected = false;
  mongoose.set(
    "strictQuery",
    true
  ); /* to ensure only those fields specified in schema are saved in db */

  if (connected) {
    //prevent next from again conneting(on refresh) if already connected to db
    console.log("MongoDB is already connected");
    return;
  }
  //connecting to db (if not already connected)
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDb connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
