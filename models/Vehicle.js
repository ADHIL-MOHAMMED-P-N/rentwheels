import { Schema, model, models } from "mongoose";

const VehicleSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pin: {
        type: String,
      },
    },
    number_of_seats: {
      type: Number,
      required: true,
    },
    gear: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    features: [{ type: String }],
    rates: {
      hourly: {
        type: Number,
      },
      daily: {
        type: Number,
      },
    },
    seller: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [{ type: String }],
    isFeatures: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Vehicle = models.Vehicle || model("Vehicle", VehicleSchema);
export default Vehicle;
