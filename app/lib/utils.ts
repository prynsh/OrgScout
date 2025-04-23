import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "../generated/prisma"


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
