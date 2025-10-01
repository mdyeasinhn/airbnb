// service.model.ts
import { Schema, model } from "mongoose";
import { IRoom } from "./room.interface";


const roomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    images: {
  type: [String], 
  required: true,
  validate: {
    validator: function (arr: string[]) {
      return arr.every((v) =>
        /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif)$/i.test(v)
      );
    },
    message: "Each image must be a valid URL with image extension",
  },
},

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number, 
      required: true,
      min: 1,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Add index for better query performance
roomSchema.index({ category: 1, isAvailable: 1 });
roomSchema.index({ price: 1 });

const Room = model<IRoom>("Room", roomSchema);
export default Room;