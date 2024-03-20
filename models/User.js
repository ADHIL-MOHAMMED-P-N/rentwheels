import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email exists"],
      required: [true, "Email required"],
    },
    username: {
      type: String,
      required: [true, "Username required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
  },
  { timestamps: true }
);
const User = models.User || model("User", UserSchema);
export default User;
