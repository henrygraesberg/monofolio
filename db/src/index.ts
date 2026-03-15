import { PrismaPg } from "@prisma/adapter-pg"
import { Prisma, PrismaClient } from "./generated/prisma/edge"
import { secondsToMilliseconds } from "date-fns"

export { Prisma } from "./generated/prisma/edge"

export const PrismaRuntime = Prisma
export const PrismaClientRuntime = PrismaClient
export type DBClient = PrismaClient
export type DBHandle = Prisma.TransactionClient
export type DBContext = Prisma.TransactionClient
export const createPrisma = (databaseUrl: string): DBClient =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
    log: ["warn", "error"],
    transactionOptions: {
      timeout: secondsToMilliseconds(30),
    },
  })
