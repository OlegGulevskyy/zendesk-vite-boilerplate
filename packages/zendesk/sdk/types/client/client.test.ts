import { expectType } from "tsd";

import zafClient from "../..";
import { Response } from "./get";

const t = async () => {
  const z = await zafClient.get("ticket");
  // replace any with the actual response object
  expectType<Response<"ticket">>(z);
};
