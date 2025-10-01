// service.interface.ts
import { Types } from "mongoose";

export interface IRoom {
  _id: Types.ObjectId;
  title: string;
  description: string;
  images: string[];
  price: number;
  location: string;
  rating: number; // 3.44 
  duration: number;
  isAvailable: boolean;
  discount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}