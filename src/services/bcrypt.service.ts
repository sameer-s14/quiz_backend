import { genSalt, hash, compare } from "bcrypt";
import { configs } from "../configs";

class BcryptService {
  async hashPassword(password: string): Promise<string> {
    const salt: string = await genSalt(configs.SALT_ROUND);
    const hashedPassword: string = await hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    enteredPassword: string,
    originalPassword: string
  ): Promise<boolean> {
    const isMatch: boolean = await compare(enteredPassword, originalPassword);
    return isMatch;
  }
}

export const bcryptService = new BcryptService();
