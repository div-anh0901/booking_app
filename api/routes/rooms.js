import express from "express";
import { createRoom, deletedRoom, getRoomById, getRooms, updatedRoom, updatedRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updatedRoom);
router.put("/availability/:id", updatedRoomAvailability);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deletedRoom);
//GET
router.get("/:id", getRoomById);
//GET ALL
router.get("/", getRooms);

export default router