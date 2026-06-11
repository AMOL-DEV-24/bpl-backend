import { Request, Response } from "express";
import { PlayerService } from "./player.service";
import {catchAsync} from "../../utils/catchAsynch";
import { sendResponse } from "../../utils/sendResponse";

// ➕ CREATE PLAYER
export const createPlayer = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PlayerService.createPlayerIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message:
        "Player registered successfully. Awaiting admin approval.",
      data: result,
    });
  }
);

// 📦 GET ALL PLAYERS
export const getAllPlayers = catchAsync(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await PlayerService.getAllPlayersFromDB(page, limit);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Players fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

// 📦 GET APPROVED PLAYERS
export const getApprovedPlayers = catchAsync(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await PlayerService.getApprovedPlayersFromDB(
      page,
      limit
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Approved players fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

// ✅ APPROVE PLAYER
export const approvePlayer = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PlayerService.approvePlayerIntoDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Player approved successfully",
      data: result,
    });
  }
);

// ❌ REJECT PLAYER
export const rejectPlayer = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PlayerService.rejectPlayerIntoDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Player rejected successfully",
      data: result,
    });
  }
);