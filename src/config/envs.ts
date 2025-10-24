import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber() || 3000,
};

export const JWT_TOKEN_KEY = {
  ACCESS: get("JWT_TOKEN_TEST").asString() || "TOKENprueba123123123",
  //SE PUEDEN AÑADIR MAS
};

export const prisma = new PrismaClient();
