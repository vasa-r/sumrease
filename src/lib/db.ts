"use server";

import { neon } from "@neondatabase/serverless";

const getDbConnection = () => {
  if (!process.env.NEON_DB_URI) {
    throw new Error("No DB URI");
  }

  const sql = neon(process.env.NEON_DB_URI);

  return sql;
};

export default getDbConnection;
