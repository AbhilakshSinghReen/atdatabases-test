const createConnectionPoolPG = require("@databases/pg");
require("dotenv").config();

const {
  createUsersTableIfNotExists,
  dropUsersTable,
  insertUser,
  updateUser,
  deleteUser,
  getUser,
} = require("./models/user");

async function main() {
  const pgDb = createConnectionPoolPG({
    connectionString: process.env.PG_DATABASE_URL,
    bigIntMode: "string",
  });
  console.log("Connection to postgres established!");

  //   dropUsersTable(pgDb);
  //   createUsersTableIfNotExists(pgDb);

  await insertUser(pgDb, "me@example.com", "red", "2023-09-01");
  user = await getUser(pgDb, "me@example.com");
  console.log("user =", user);

  pgDb.dispose();
  console.log("Connection to postgres terminated.");

  process.exit();
}

main();
