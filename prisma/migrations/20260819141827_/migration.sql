-- CreateTable
CREATE TABLE "keepalive" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'alive',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keepalive_pkey" PRIMARY KEY ("id")
);
