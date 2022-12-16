import { NewTicketSidebar } from "./new_ticket_sidebar";
import { TicketSidebar } from "./ticket_sidebar";

export type Locations = {
  ["ticket_sidebar"]: TicketSidebar;
  ["new_ticket_sidebar"]: NewTicketSidebar;
};
