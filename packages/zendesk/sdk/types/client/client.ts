import { NestedPaths } from "../utilities";
import { GetData, GettableLocations } from "./get";

type ZendeskApiResponse<U> = U & {
  errors: {};
};

export type ZafClient = {
  invoke: (cmd: string, arg: any) => void;

  get: <Path extends NestedPaths<GettableLocations>>(
    key: Path
  ) => Promise<ZendeskApiResponse<GetData<Path>>>;

  metadata: <U>() => Metadata<U>;
  request: <U>(data: Object) => Promise<U>;
  on: (eventName: string, listener: (...args: any) => any) => void;
};
