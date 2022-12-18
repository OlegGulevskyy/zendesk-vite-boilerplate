import { Locations as AllLocations } from "../apps/support/locations";

type LocationsKeys = keyof AllLocations;
export type GettableLocations = AllLocations[LocationsKeys];
