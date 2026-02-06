import { prisma } from "@/lib/db";


import { CreateApiKeyDto } from "./types/apiKey.dto";

export const createApiKey = async ({ userId, expiresAt, apiKey }: CreateApiKeyDto) => {

   prisma.apiKey.create({
    data: {
      userId,
      apiKey: apiKey,
      expiresAt,
    },
   })
}