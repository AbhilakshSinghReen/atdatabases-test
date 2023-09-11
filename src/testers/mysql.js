const createConnectionPool = require("@databases/mysql");
const { sql } = require("@databases/mysql");

async function testMySQL(connectionPoolConfig) {
  console.log("Time zone config = ");
  console.log(connectionPoolConfig.timeZone);

  const db = createConnectionPool(connectionPoolConfig);
  console.log("Connection to MySQL established!");

  let result = await db.query(sql`
    DROP TABLE IF EXISTS users
  `);

  result = await db.query(sql`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        email TEXT NOT NULL,
        foo_date DATE NOT NULL,
        foo_timestamp TIMESTAMP NOT NULL
    )
  `);
  console.log("users table created / existed.");

  result = await db.query(sql`
    INSERT INTO users (email, foo_date, foo_timestamp)
        VALUES ('me1@example.com', '2023-09-02', '2023-09-02 12:00:00')
  `);

  result = await db.query(sql`
    INSERT INTO users (email, foo_date, foo_timestamp)
        VALUES ('me2@example.com', '2023-09-04', '2023-09-04 12:00:00')
  `);

  result = await db.query(sql`
    INSERT INTO users (email, foo_date, foo_timestamp)
        VALUES ('me3@example.com', '2023-09-06', '2023-09-06 12:00:00')
  `);
  console.log("3 users inserted");

  console.log("Feteching all users...");

  result = await db.query(sql`
    SELECT * FROM users
  `);

  db.dispose();
  console.log("Connection to MySQL terminated.");

  return result;
}

module.exports = testMySQL;
