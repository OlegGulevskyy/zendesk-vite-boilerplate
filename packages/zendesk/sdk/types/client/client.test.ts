import { expectType } from "tsd";

import zafClient from "../..";

// wrpapper around tests to be abe to use async/await
const ClientGet = async () => {
  const idData = await zafClient.get("ticket.id");
  expectType<number>(idData["ticket.id"]);

  const arrayOfTags = await zafClient.get("ticket.tags");
  expectType<string[]>(arrayOfTags["ticket.tags"]);
};
