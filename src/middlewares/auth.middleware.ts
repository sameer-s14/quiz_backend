import { AuthRepository } from "./../repositories/auth.repository";
import { JwtService } from "./../services/jwt.service";
import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES } from "../constants";
import { handleError } from "../utils";

const jwtService = new JwtService();
const authRepository = new AuthRepository();
export const authMiddleware = async (
  req: any,
  _: Response,
  next: NextFunction
) => {
  try {
    // 1) Getting token and check of it's there
    let token = undefined;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new Error(ERROR_MESSAGES.NOT_LOGGED_IN);
    }

    // 2) Verification token
    const decoded = jwtService.verifyToken(token) as { id: string };
    if (!decoded || !decoded["id"]) {
      throw new Error(ERROR_MESSAGES.USER_WITH_TOKEN_NOT_EXIST);
    }

    // 3) Check if user still exists
    const currentUser = await authRepository.getUserData({ _id: decoded["id"] });
    if (!currentUser) {
      throw new Error(ERROR_MESSAGES.USER_WITH_TOKEN_NOT_EXIST);
    }

    // Check if user changed password after the token was issued
    //   if (currentUser?.changedPasswordAfter(decoded["iat"])) {
    //     return next(
    //       new UnauthorizedException(ERROR_MESSAGES.RECENTLY_CHANGED_PASSWORD)
    //     );
    //   }

    // GRANT ACCESS TO PROTECTED ROUTE
    req["user"] = currentUser;
    return next();
  } catch (err) {
    handleError("Auth MiddleWare", err);
    return next(err);
  }
};
