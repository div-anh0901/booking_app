import express from "express";
import { createHotel, updatedHotel, getHotelById, deletedHotel, getHotels } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updatedHotel);
//DELETE
router.delete("/:id", verifyAdmin, deletedHotel);
//GET
router.get("/:id", getHotelById);
//GET ALL
router.get("/", getHotels);

export default router