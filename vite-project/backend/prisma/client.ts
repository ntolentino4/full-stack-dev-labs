import { PrismaClient } from "@prisma/client";

/**
 * Initialize a single PrismaClient instance.
 * Prevents multiple DB connections during development.
 */

let prisma = new PrismaClient();

export default prisma;