import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUserInsert, TUserSelect, userTable } from "../drizzle/schema";

export const getUsersService = async ():Promise<TUserSelect[] | null> => {
  return await db.query.userTable.findMany();
};

export const getUserBiIdService = async (userId: number):Promise<TUserSelect | undefined> => {
  return await db.query.userTable.findFirst({
    where: eq(userTable.userId, userId),
  });
};

export const createUserService = async (user: TUserInsert): Promise<string> => {
  await db.insert(userTable).values(user).returning();
  return "User Created Succesfully";
};

export const updateUserService = async (userId: number, user: TUserInsert):Promise<string> => {
  await db.update(userTable).set(user).where(eq(userTable.userId, userId));
  return "User Updated Successfully";
};

export const deleteUserService = async (userId: number): Promise<string> => {
  await db.delete(userTable).where(eq(userTable.userId, userId));
  return "User Deleted Successfully";
};
