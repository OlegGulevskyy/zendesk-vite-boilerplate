import { expectType } from "tsd";

import zafClient from "../..";
import { Ticket } from "../apps/support/locations/objects/ticket";

// wrpapper around tests to be abe to use async/await
const ClientGet = async () => {
	const ticket = await zafClient.get("ticket")
	expectType<Ticket>(ticket)

  const ticketId = await zafClient.get("ticket.id");
  expectType<number>(ticketId);

  const arrayOfTags = await zafClient.get("ticket.tags");
  expectType<string[]>(arrayOfTags);
};
