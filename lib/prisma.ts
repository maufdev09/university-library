import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaDatabaseUrl?: string;
};

export function getPrisma() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is missing. Add it to .env.local and restart the dev server.",
    );
  }

  if (
    !globalForPrisma.prisma ||
    globalForPrisma.prismaDatabaseUrl !== databaseUrl
  ) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
    globalForPrisma.prismaDatabaseUrl = databaseUrl;
  }

  return globalForPrisma.prisma;
}
