-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "image" TEXT DEFAULT 'https://res.cloudinary.com/dbc9pgfws/image/upload/v1752722403/image_placeholder_nmmqdn.png',
    "username" TEXT NOT NULL,
    "display_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow_user" (
    "id" SERIAL NOT NULL,
    "isFollow" BOOLEAN NOT NULL DEFAULT false,
    "target_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "follow_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "like_count" INTEGER NOT NULL,
    "save_count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like_user" (
    "id" SERIAL NOT NULL,
    "isLike" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "feed_id" INTEGER NOT NULL,

    CONSTRAINT "like_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_user" (
    "id" SERIAL NOT NULL,
    "field_comment" TEXT NOT NULL,
    "like_count" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "feed_id" INTEGER NOT NULL,

    CONSTRAINT "comment_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bio_user" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "bio_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "actor_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,
    "feed_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "actor_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedSaved" (
    "id" SERIAL NOT NULL,
    "feed_id" INTEGER NOT NULL,
    "isSaved" BOOLEAN NOT NULL DEFAULT false,
    "actor_id" INTEGER NOT NULL,

    CONSTRAINT "feedSaved_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "follow_user_target_id_isFollow_idx" ON "follow_user"("target_id", "isFollow");

-- CreateIndex
CREATE UNIQUE INDEX "follow_user_user_id_target_id_key" ON "follow_user"("user_id", "target_id");

-- CreateIndex
CREATE INDEX "feed_createdAt_idx" ON "feed"("createdAt");

-- CreateIndex
CREATE INDEX "feed_user_id_createdAt_idx" ON "feed"("user_id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "like_user_user_id_feed_id_key" ON "like_user"("user_id", "feed_id");

-- CreateIndex
CREATE INDEX "comment_user_feed_id_id_idx" ON "comment_user"("feed_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_like_user_id_comment_id_key" ON "comment_like"("user_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "bio_user_user_id_key" ON "bio_user"("user_id");

-- CreateIndex
CREATE INDEX "notification_target_id_createdAt_idx" ON "notification"("target_id", "createdAt");

-- CreateIndex
CREATE INDEX "chat_actor_id_target_id_createdAt_idx" ON "chat"("actor_id", "target_id", "createdAt");

-- CreateIndex
CREATE INDEX "chat_target_id_actor_id_createdAt_idx" ON "chat"("target_id", "actor_id", "createdAt");

-- CreateIndex
CREATE INDEX "feedSaved_actor_id_isSaved_idx" ON "feedSaved"("actor_id", "isSaved");

-- CreateIndex
CREATE UNIQUE INDEX "feedSaved_feed_id_actor_id_key" ON "feedSaved"("feed_id", "actor_id");

-- AddForeignKey
ALTER TABLE "follow_user" ADD CONSTRAINT "follow_user_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_user" ADD CONSTRAINT "follow_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed" ADD CONSTRAINT "feed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_user" ADD CONSTRAINT "like_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_user" ADD CONSTRAINT "like_user_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_user" ADD CONSTRAINT "comment_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_user" ADD CONSTRAINT "comment_user_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bio_user" ADD CONSTRAINT "bio_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedSaved" ADD CONSTRAINT "feedSaved_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedSaved" ADD CONSTRAINT "feedSaved_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
