// 0001 | import { PrismaPg } from "@prisma/adapter-pg"
// 0002 | import { Prisma, PrismaClient } from "./generated/prisma/edge"
// 0003 | import { secondsToMilliseconds } from "date-fns"
// 0004 | 
// 0005 | export { Prisma } from "./generated/prisma/edge"
// 0006 | 
// 0007 | export const PrismaRuntime = Prisma
// 0008 | export const PrismaClientRuntime = PrismaClient
// 0009 | export type DBClient = PrismaClient
// 0010 | export type DBHandle = Prisma.TransactionClient
// 0011 | export type DBContext = Prisma.TransactionClient
// 0012 | export const createPrisma = (databaseUrl: string): DBClient =>
// 0013 |   new PrismaClient({
// 0014 |     adapter: new PrismaPg({ connectionString: databaseUrl }),
// 0015 |     log: ["warn", "error"],
// 0016 |     transactionOptions: {
// 0017 |       timeout: secondsToMilliseconds(30),
// 0018 |     },
// 0019 |   })
