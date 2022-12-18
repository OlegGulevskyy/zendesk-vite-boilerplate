import { Group } from "../group";
import { Identity } from "./identities";
import { Organization } from "./organizations";
import { Timezone } from "./timezone";

type UserRole = "end-user" | "agent" | "admin";

export type User = {
  alias: string | null;
  avatarUrl: string;
  details: string | null;
  email: string;
  externalId: string | null;
  id: number;
  identities: Identity[];
  isSystemUser: boolean;
  locale: string;
  name: string;
  notes: null;
  role: UserRole;
  signature: string | null;
  tags: [];
  timeZone: Timezone;
  groups: Group[];
  organizations: Organization[];
};
