import { createUser, getUserByUsername } from "./user.repository";
import { CreateUserDto } from "./types/user.dto";
import { createUserSchema } from "./user.scheme";

export const createUserService = async (data: CreateUserDto) => {
 try {

  const existingUser = await getUserByUsername(data.username);

  if (existingUser) {
    return existingUser;
  }

  const result = createUserSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  const res = await createUser(data);
  return res;
 } catch (error) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw error;
 }
};
