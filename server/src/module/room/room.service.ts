import Room from "./room.model";
import AppError from "../../error/appError";
import httpStatus from 'http-status-codes';
import { IRoom } from "./room.interface";
import QueryBuilder from "../../builder/queryBuilder";

// Create a service 
const createRoom = async (payload: IRoom) => {
    const result = await Room.create(payload);
    return result;
};

// Get all services
const getAllRoom = async (query: Record<string, unknown>) => {
    const searchableFields = ['title', 'description',];
    const rooms = new QueryBuilder(Room.find(), query)
        .search(searchableFields)
        .filter()
        .paginate()
        .sort()
        .select()
    const result = await rooms.modelQuery;
    return result;
};

// update service data
const updateRoom = async (id: string, data: IRoom) => {
    const user = await Room.findOne({ _id: id });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found!")
    }
    const result = await Room.findOneAndUpdate({ _id: id }, data,
        { new: true, runValidators: true });
    return result;
};

const deleteRoom = async (id: string) => {
    const service = await Room.findOne({ _id: id });
    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found!")
    }
    const result = Room.deleteOne({ _id: id });
    return result
}

export const roomService = {
    createRoom,
    getAllRoom,
    updateRoom,
    deleteRoom
}