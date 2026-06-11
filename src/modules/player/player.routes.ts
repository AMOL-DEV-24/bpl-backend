import { Router } from "express";
import {
  createPlayer,
  getAllPlayers,
  getApprovedPlayers,
  approvePlayer,
  rejectPlayer,
} from "./players.controller";

const router = Router();

router.post("/register",          createPlayer);
router.get("/",                   getAllPlayers);       // BPL Hub admin
router.get("/approved",           getApprovedPlayers); // BPL Official
router.patch("/:id/approve",      approvePlayer);      // BPL Hub admin
router.patch("/:id/reject",       rejectPlayer);       // BPL Hub admin

export default router;