import { randomBytes, createHmac } from "node:crypto";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
  type CreatUserWithEmailAndPasswordInputType,
  creatUserWithEmailAndPasswordInput,
} from "./model";

class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) {
      return null;
    }
    return result[0];
  }

  public async creatUserWithEmailAndPassword(payload: CreatUserWithEmailAndPasswordInputType) {
    const { fullName, email, password } =
      await creatUserWithEmailAndPasswordInput.parseAsync(payload);

    const existingUserWithEmail = await this.getUserByEmail(email);
    if (existingUserWithEmail) {
      throw new Error("A user with this email already exists");
    }

    const salt = randomBytes(16).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const userInsertResult = await db
      .insert(usersTable)
      .values({ email, fullName, password: hash, salt: salt })
      .returning({
        id: usersTable.id,
      });

    if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id)
      throw new Error("something went wrong creating user");

    return {
      id: userInsertResult[0].id,
    };
  }
}

export default UserService;
