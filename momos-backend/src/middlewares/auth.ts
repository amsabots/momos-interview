import { NextFunction } from "express";

/**
 * ============ NOTE TO DEVELOPER READING THIS ==========
 *
 * - Basic auth middleware using password and username has been intentionally disabled because session maintenance, monitoring and verification is done via redux on the front end side.
 * - The idea is to have a single source of truth after the login process is complete.
 *
 * For the case above. i have returned next directly without handling any business logic
 */
export const BasicAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next();
};
