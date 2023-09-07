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

  createUsersTableIfNotExists(pgDb);
  //   dropUsersTable(pgDb);

//   await insertUser(pgDb, "me@example.com", "red");

  let user = await getUser(pgDb, "me@example.com");
  console.log("user =", user); // should output null

  //   await insertUser(pgDb, "me2@example.com", "yellow");
  //   await updateUser(pgDb, "me@example.com", "blue");

  //   user = await getUser(pgDb, "me@example.com");
  //   console.log("user =", user);

  pgDb.dispose();
  console.log("Connection to postgres terminated.");

  process.exit();
}

main();
