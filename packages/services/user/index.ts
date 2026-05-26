import { randomBytes, createHmac } from "node:crypto";
import * as JWT from "jsonwebtoken";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
  type CreatUserWithEmailAndPasswordInputType,
  GenerateUserTokenPayloadType,
  SigninUserWithEmailAndPasswordInputType,
  creatUserWithEmailAndPasswordInput,
  generateUserTokenPayload,
  signinUserWithEmailAndPasswordInput,
} from "./model";
import { env } from "../env";

class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) {
      return null;
    }
    return result[0];
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);
    const token = JWT.sign({ id }, env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
  }

  private async verifyUserToken(token: string): Promise<GenerateUserTokenPayloadType> {
    try {
      const decoded = JWT.verify(token, env.JWT_SECRET) as GenerateUserTokenPayloadType;
      return { id: decoded.id };
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  private async generateHash(password: string, salt: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public async getUserInfoById(id: string) {
    const user = await db
      .select({ id: usersTable.id, email: usersTable.email, fullName: usersTable.fullName })
      .from(usersTable)
      .where(eq(usersTable.id, id));
    if (!user || user.length === 0) {
      throw new Error("User not found");
    }
    return user[0]!;
  }

  public async creatUserWithEmailAndPassword(payload: CreatUserWithEmailAndPasswordInputType) {
    const { fullName, email, password } =
      await creatUserWithEmailAndPasswordInput.parseAsync(payload);

    const existingUserWithEmail = await this.getUserByEmail(email);
    if (existingUserWithEmail) {
      throw new Error("A user with this email already exists");
    }

    const salt = randomBytes(16).toString("hex");
    const hash = await this.generateHash(password, salt);

    const userInsertResult = await db
      .insert(usersTable)
      .values({ email, fullName, password: hash, salt: salt })
      .returning({
        id: usersTable.id,
      });

    if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id)
      throw new Error("something went wrong creating user");
    const userId = userInsertResult[0].id;
    const { token } = await this.generateUserToken({ id: userId });
    return {
      id: userId,
      token,
    };
  }

  public async signinUserWithEmailAndPassword(payload: SigninUserWithEmailAndPasswordInputType) {
    const { email, password } = await signinUserWithEmailAndPasswordInput.parseAsync(payload);

    const existingUserWithEmail = await this.getUserByEmail(email);

    if (!existingUserWithEmail) {
      throw new Error("Invalid email or password");
    }
    if (!existingUserWithEmail.password || !existingUserWithEmail.salt) {
      throw new Error("Invalid authentication method for this user");
    }

    const hash = await this.generateHash(password, existingUserWithEmail.salt);

    if (hash !== existingUserWithEmail.password) {
      throw new Error("Invalid email or password");
    }

    const { token } = await this.generateUserToken({ id: existingUserWithEmail.id });
    return {
      id: existingUserWithEmail.id,
      token,
    };
  }

  public async verifyAndDecodeUserToken(token: string) {
    const { id } = await this.verifyUserToken(token);
    
    return { id };
  }
}

export default UserService;
