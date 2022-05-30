import express from "express";
import { createRoom, deletedRoom, getRoomById, getRooms, updatedRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updatedRoom);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deletedRoom);
//GET
router.get("/:id", getRoomById);
//GET ALL
router.get("/", getRooms);

export default router