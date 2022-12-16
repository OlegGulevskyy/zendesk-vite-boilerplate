import { ClientGet } from "./get";

export type ZafClient = {
  invoke: (cmd: string, arg: any) => void;
  get: ClientGet;
  metadata: <U>() => Metadata<U>;
  request: <U>(data: Object) => Promise<U>;
  on: (eventName: string, listener: (...args: any) => any) => void;
};
