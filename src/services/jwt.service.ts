import { sign, verify, JwtPayload } from "jsonwebtoken";
import { configs } from "../configs";
import { IUser } from "../interfaces";

export class JwtService {
  public createToken(user: Partial<IUser>) {
    const dataStoredInToken = { id: user?.id };

    return {
      token: sign(dataStoredInToken, configs.JWT.SECRET, {
        expiresIn: configs.JWT.EXPIRES_IN,
      }),
    };
  }

  verifyToken = (token: string): string | JwtPayload => {
    return verify(token, configs.JWT.SECRET);
  };
}
