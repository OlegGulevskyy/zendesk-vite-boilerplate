// The ZAFClient is injected in the index.html file when built / served.
// See docs for help regarding the ZAFClient: https://developer.zendesk.com/apps/docs/developer-guide/getting_started

interface IMetadata {
  appId: number;
  installationId: number;
  name: string;
  plan: {
    name: string;
  };
}

interface IClient {
  invoke: (cmd: string, arg: any) => void;
  get: (getter: string) => any;
  metadata: () => IMetadata;
  request: <U>(data: Object) => Promise<U>;
}

declare global {
	interface Window {
		ZAFClient: {
			init: () => IClient
		}
	}
}

let zafClient: IClient;
if (typeof window.ZAFClient === "undefined") {
  // eslint-disable-line no-undef
  throw new Error("ZAFClient cannot run outside Zendesk");
} else {
  zafClient = window.ZAFClient.init(); // eslint-disable-line no-undef
}

export default zafClient;
