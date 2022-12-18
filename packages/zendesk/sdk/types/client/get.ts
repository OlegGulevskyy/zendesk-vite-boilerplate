import { Locations as AllLocations } from "../apps/support/locations";
import { NestedPaths, TypeFromPath } from "../utilities";

type LocationsKeys = keyof AllLocations;
export type GettableLocations = AllLocations[LocationsKeys];

export type GetData<Key extends NestedPaths<GettableLocations>> = {
	[key in Key]: TypeFromPath<GettableLocations, key>;
}
