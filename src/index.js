const createConnectionPoolPG = require("@databases/pg");
require("dotenv").config();

async function main() {
  const pgDb = createConnectionPoolPG({
    connectionString: process.env.PG_DATABASE_URL,
    bigIntMode: "string",
  });
  console.log("Connection to postgres established!");

  pgDb.dispose();
  console.log("Connection to postgres terminated.");

  process.exit();
}

main();
