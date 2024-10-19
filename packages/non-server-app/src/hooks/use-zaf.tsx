// Extend window to indicate there is ZAFClient
import { useMemo } from "react";
import type { ZafClient, ZAFClient } from "zendesk-types";

declare global {
  interface Window {
    ZAFClient: ZAFClient;
  }
}

const createZafClient = (() => {
  let client: ZafClient | null = null;
  return () => {
    return client ? client : window.ZAFClient.init();
  };
})();

export const useZaf = () => {
  const zafClient = useMemo(() => createZafClient(), []);
  return { zafClient };
};
