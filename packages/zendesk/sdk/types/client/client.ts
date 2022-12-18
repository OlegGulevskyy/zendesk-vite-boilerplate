import { NestedPaths, TypeFromPath } from "../utilities";
import { GettableLocations } from "./get";

export type ZafClient = {
  invoke: (cmd: string, arg: any) => void;

  get: <Path extends NestedPaths<GettableLocations>>(
    key: Path
  ) => Promise<TypeFromPath<GettableLocations, Path>>;

  metadata: <U>() => Metadata<U>;
  request: <U>(data: Object) => Promise<U>;
  on: (eventName: string, listener: (...args: any) => any) => void;
};
