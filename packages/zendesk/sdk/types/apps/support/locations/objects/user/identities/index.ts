type IdentityType =
  | "email"
  | "twitter"
  | "facebook"
  | "google"
  | "agent_forwarding"
  | "phone_number";

export type Identity<I = "email"> = {
  id: number;
  type: IdentityType;
  value: string;
  verified: boolean;
  primary: boolean;
  userId: number;
  undeliverableCount: number;
  deliverableState: I extends "email" ? "deliverable" | "undeliverable" : null;
};
