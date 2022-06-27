// The ZAFClient is injected in the index.html file when built / served.
// See docs for help regarding the ZAFClient: https://developer.zendesk.com/apps/docs/developer-guide/getting_started
// import { IClient } from "./types";

let zafClient: ReturnType<typeof window.ZAFClient["init"]>;
if (typeof window.ZAFClient === "undefined") {
  // eslint-disable-line no-undef
  throw new Error("ZAFClient cannot run outside Zendesk");
} else {
  zafClient = window.ZAFClient.init(); // eslint-disable-line no-undef
}

export default zafClient;
