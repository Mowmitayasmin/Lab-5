import * as userService from "../services/user";
import { Request, Response, NextFunction } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export const findOrCreateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (userId) {
      const user = await clerkClient.users.getUser(userId);
      let backendUser = await userService.getUserById(userId);
      if (!backendUser && user.firstName) {
        backendUser = await userService.createUser(user.id, user.firstName);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
