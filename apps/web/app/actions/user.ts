"use server";
import { createUserService } from "@/modules/user/user.service";
import { CreateUserDto } from "@/modules/user/types/user.dto";



export async function createUserAction({ username, image, email }: CreateUserDto) {
    return createUserService({ username, image, email })
}