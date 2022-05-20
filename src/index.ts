// import { fetchAndKill } from "./functions/fetchAndKill";
import "source-map-support/register";
import "dotenv/config";

import { app } from "./app";

const port = process.env.PORT || 4000;

const main = async () => {
  await app.listen(port, "0.0.0.0");
  // await fetchAndKill(`http://localhost:${port}/`);
};

main();
