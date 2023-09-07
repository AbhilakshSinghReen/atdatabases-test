const { sql } = require("@databases/pg");

async function createUsersTableIfNotExists(db) {
  await db.query(sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL NOT NULL PRIMARY KEY,
          email TEXT NOT NULL,
          favorite_color TEXT NOT NULL,
          date_of_birth DATE NOT NULL DEFAULT CURRENT_DATE,
          UNIQUE(email)
        )
      `);
}

async function dropUsersTable(db) {
  await db.query(sql`
        DROP TABLE users
      `);
}

async function insertUser(db, email, favoriteColor, dateOfBirth) {
  await db.query(sql`
        INSERT INTO users (email, favorite_color, date_of_birth)
        VALUES (${email}, ${favoriteColor}, ${dateOfBirth})
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

module.exports = {
  createUsersTableIfNotExists,
  dropUsersTable,
  insertUser,
  updateUser,
  deleteUser,
  getUser,
};
