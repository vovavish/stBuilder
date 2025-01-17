-- CreateTable
CREATE TABLE "Layouts" (
    "id" SERIAL NOT NULL,
    "layout_data" JSONB NOT NULL,

    CONSTRAINT "Layouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "site_data" JSONB NOT NULL,

    CONSTRAINT "UsersSites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersSites" ADD CONSTRAINT "UsersSites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
