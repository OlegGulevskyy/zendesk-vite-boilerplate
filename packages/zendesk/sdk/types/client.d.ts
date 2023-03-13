interface IMetadata<T> {
  appId: number;
  installationId: number;
  name: string;
  plan: {
    name: string;
  };
  settings?: T;
}

interface IClient {
  invoke: (cmd: string, arg: any) => void;
  get: (getter: string) => any;
  metadata: <U>() => IMetadata<U>;
  request: <U>(data: Object) => Promise<U>;
  on: (eventName: string, listener: (...args: any) => any) => void;
}

declare global {
  interface Window {
    ZAFClient: {
      init: () => IClient;
    };
  }
}

export {};
