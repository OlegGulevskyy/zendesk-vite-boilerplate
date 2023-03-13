import { useEffect, useState } from "react";
import { useZaf } from "../../hooks/useZaf";

export const DummyComponent = () => {
  const { zafClient } = useZaf();
  const [requester, setRequester] = useState({});

  useEffect(() => {
    zafClient?.get("ticket.requester").then((data: unknown) => {
      setRequester(data["ticket.requester"]);
    });
  }, [zafClient]);

  return <div>Hi {requester.name || "dummy"}</div>;
};
