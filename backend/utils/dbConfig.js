const { PrismaClient } = require("@prisma/client");

// Singleton pattern untuk PrismaClient
const prisma = new PrismaClient();

module.exports = prisma;