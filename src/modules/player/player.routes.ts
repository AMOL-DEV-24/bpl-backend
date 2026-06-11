import express from "express";

import {
  createPlayer,
  getAllPlayers,
  getApprovedPlayers,
  approvePlayer,
  rejectPlayer,
} from "./player.controller";

const router = express.Router();

router.post(
  "/register",
  createPlayer
);

router.get(
  "/all",
  getAllPlayers
);

router.get(
  "/approved",
  getApprovedPlayers
);

router.patch(
  "/:id/approve",
  approvePlayer
);

router.patch(
  "/:id/reject",
  rejectPlayer
);

export default router;