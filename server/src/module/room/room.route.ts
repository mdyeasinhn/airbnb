import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { roomValidation } from "./room.validation";
import { roomController } from "./room.controller";


const roomRoutes = Router();
roomRoutes.get("/", roomController.getAllRoom);

roomRoutes.post("/create-room",
    validateRequest(roomValidation.createValidationSchema),
    roomController.createRoom);

roomRoutes.put("/:roomId",
    validateRequest(roomValidation.updateValidationSchema),
    roomController.updateRoom);

roomRoutes.delete("/:roomId",
    roomController.deleteRoom);


export default roomRoutes;
