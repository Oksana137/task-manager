import { QueryTypes } from "sequelize";
import sequelize from "./server.js";
import Project from "../models/Project.js";

export const initializeProjectOwnership = async () => {
  await sequelize.transaction(async (transaction) => {
    await Project.sync({ transaction });
    await sequelize.query(
      'ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "ownerId" integer REFERENCES "User" ("id") ON DELETE SET NULL',
      { transaction },
    );

    const [legacy] = await sequelize.query(
      `SELECT to_regclass('"ProjectMember"') IS NOT NULL AS "exists"`,
      { type: QueryTypes.SELECT, transaction },
    );
    if (!legacy.exists) return;

    await sequelize.query(
      `UPDATE "Project" AS project
       SET "ownerId" = membership."userId"
       FROM (
         SELECT "projectId", MIN("userId") AS "userId"
         FROM "ProjectMember"
         GROUP BY "projectId"
         HAVING COUNT(DISTINCT "userId") = 1
       ) AS membership
       WHERE project.id = membership."projectId" AND project."ownerId" IS NULL`,
      { transaction },
    );
  });
};
