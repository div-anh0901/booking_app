import express from "express";
import { createHotel, updatedHotel, getHotelById, deletedHotel, getHotels, countByCity, countByType, getHotelRomms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updatedHotel);
//DELETE
router.delete("/:id", verifyAdmin, deletedHotel);
//GET
router.get("/find/:id", getHotelById);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/rooms/:id", getHotelRomms);
export default router