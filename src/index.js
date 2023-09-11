require("dotenv").config();
const testMySQL = require("./testers/mysql");
const testPg = require("./testers/pg");

async function main() {
  const commonConnectionPoolConfig = {
    connectionString: process.env.PG_DATABASE_URL,
    bigIntMode: "string",
  };

  console.log("-----> Test 1");
  let fetchedUsers = await testPg({
    ...commonConnectionPoolConfig,
    // timeZone: "utc",
  });
  console.log(fetchedUsers);
  console.log("---> Test 1 Completed");
  console.log("");

  // console.log("-----> Test 2");
  // fetchedUsers = await testPg({
  //   ...commonConnectionPoolConfig,
  //   timeZone: "local",
  // });
  // console.log(fetchedUsers);
  // console.log("---> Test 2 Completed");

  // console.log("-----> Test 3");
  // fetchedUsers = await testPg({
  //   ...commonConnectionPoolConfig,
  //   timeZone: {
  //     server: "utc",
  //     client: "utc",
  //   },
  // });
  // console.log(fetchedUsers);
  // console.log("---> Test 3 Completed");

  // console.log("-----> Test 4");
  // fetchedUsers = await testPg({
  //   ...commonConnectionPoolConfig,
  //   timeZone: {
  //     server: "local",
  //     client: "utc",
  //   },
  // });
  // console.log(fetchedUsers);
  // console.log("---> Test 4 Completed");

  // console.log("-----> Test 5");
  // fetchedUsers = await testPg({
  //   ...commonConnectionPoolConfig,
  //   timeZone: {
  //     server: "utc",
  //     client: "local",
  //   },
  // });
  // console.log(fetchedUsers);
  // console.log("---> Test 5 Completed");

  // console.log("-----> Test 6");
  // fetchedUsers = await testPg({
  //   ...commonConnectionPoolConfig,
  //   timeZone: {
  //     server: "local",
  //     client: "local",
  //   },
  // });
  // console.log(fetchedUsers);
  // console.log("---> Test 6 Completed");

  /////
  process.exit();
}

main();
