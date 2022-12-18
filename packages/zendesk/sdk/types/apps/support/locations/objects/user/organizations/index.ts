// TODO add support for custom fields

import { Group } from "../../group";

// TODO incomplete!
type OrganizationField = {
	name: string;
	isVisible: boolean;
}

export type Organization = {
	details: string | null;
	domains: string;
	externalId: string | null;
	groups: Group;
	id: number;
	name: string;
	notes: string | null;
	sharedComments: boolean;
	sharedTickets: boolean;
	tags: string[];
	organizationFields: OrganizationField[];
}
