const createConnectionPoolPG = require("@databases/pg");
const { sql } = require("@databases/pg");
require("dotenv").config();

async function insertUser(db, email, favoriteColor) {
  await db.query(sql`
      INSERT INTO users (email, favorite_color)
      VALUES (${email}, ${favoriteColor})
    `);
}

async function updateUser(db, email, favoriteColor) {
  await db.query(sql`
      UPDATE users
      SET favorite_color=${favoriteColor}
      WHERE email=${email}
    `);
}

async function deleteUser(db, email) {
  await db.query(sql`
      DELETE FROM users
      WHERE email=${email}
    `);
}

async function getUser(db, email) {
  const users = await db.query(sql`
      SELECT * FROM users
      WHERE email=${email}
    `);
  if (users.length === 0) {
    return null;
  }
  return users[0];
}

async function main() {
  const pgDb = createConnectionPoolPG({
    connectionString: process.env.PG_DATABASE_URL,
    bigIntMode: "string",
  });
  console.log("Connection to postgres established!");

  await pgDb.query(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        email TEXT NOT NULL,
        favorite_color TEXT NOT NULL,
        UNIQUE(email)
      )
    `);

  let user = await getUser(pgDb, "me@example.com");
  console.log("user =", user); // should output null

  await insertUser(pgDb, "me@example.com", "red");
  await insertUser(pgDb, "me2@example.com", "yellow");
  await updateUser(pgDb, "me@example.com", "blue");

  user = await getUser(pgDb, "me@example.com");
  console.log("user =", user);

  pgDb.dispose();
  console.log("Connection to postgres terminated.");

  process.exit();
}

main();
