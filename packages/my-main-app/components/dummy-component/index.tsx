import { useEffect, useState } from "react";
import { useZaf } from "../../hooks/useZaf";

export const DummyComponent = () => {
  const { zafClient } = useZaf();
  const [requesterName, setRequesterName] = useState("");

  useEffect(() => {
    zafClient?.get("ticket.requester").then((data) => {
      setRequesterName(data["ticket.requester"].name);
    });
  }, [zafClient]);

  return <div>Hi {requesterName || "dummy"}</div>;
};
