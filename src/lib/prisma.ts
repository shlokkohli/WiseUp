import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
  
  // Attempt to connect and log success
  prisma.$connect()
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
      console.error("Failed to connect to the DB:", error);
    });
}
console.log("DB connected successfully")
// Export the Prisma client instance
export default prisma;

