import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { roomService } from "./room.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// Create  Room 
const createRoom = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await roomService.createRoom(payload);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Room is created successfully!',
        data: result,
    })
});

// Get all Room
const getAllRoom = catchAsync(async (req: Request, res: Response) => {

    const result = await roomService.getAllRoom(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Rooms retrieved successfully!",
        data: result,
    })
});

//  update 
const updateRoom = catchAsync(async (req, res) => {
    const roomId = req.params.roomId;
    const data = req.body;
    const result = await roomService.updateRoom(roomId, data);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Room updated succesfully!',
        data: result,
    })
});

const deleteRoom = catchAsync(async (req, res) => {
    const serviceId = req.params.userId
    await roomService.deleteRoom(serviceId)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Room deleted succesfully!',
        data: {},
    })
})
export const roomController = {
    createRoom,
    getAllRoom,
    updateRoom,
    deleteRoom
}