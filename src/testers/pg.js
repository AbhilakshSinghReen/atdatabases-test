const createConnectionPool = require("@databases/pg");
const { sql } = require("@databases/pg");

async function testPg(connectionPoolConfig) {
  console.log("Time zone config = ");
  console.log(connectionPoolConfig.timeZone);

  const db = createConnectionPool(connectionPoolConfig);
  console.log("Connection to Postgres established!");

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
  console.log("Inserting user 1:- ");
  console.log({
    email: "me1@example.com",
    foo_date: "2023-09-02",
    foo_timestamp: "2023-09-02 12:00:00",
  });

  result = await db.query(sql`
    INSERT INTO users (email, foo_date, foo_timestamp)
        VALUES ('me2@example.com', '2023-09-04', '2023-09-04 12:00:00')
  `);
  console.log("Inserting user 2:- ");
  console.log({
    email: "me2@example.com",
    foo_date: "2023-09-04",
    foo_timestamp: "2023-09-04 12:00:00",
  });

  result = await db.query(sql`
    INSERT INTO users (email, foo_date, foo_timestamp)
        VALUES ('me3@example.com', '2023-09-06', '2023-09-06 12:00:00')
  `);
  console.log("Inserting user 3:- ");
  console.log({
    email: "me3@example.com",
    foo_date: "2023-09-06",
    foo_timestamp: "2023-09-06 12:00:00",
  });
  console.log("3 users inserted");

  console.log("Feteching all users...");

  result = await db.query(sql`
    SELECT * FROM users
  `);

  db.dispose();
  console.log("Connection to Postgres terminated.");

  return result;
}

module.exports = testPg;
