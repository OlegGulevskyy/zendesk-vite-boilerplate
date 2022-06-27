interface IMetadata {
  appId: number;
  installationId: number;
  name: string;
  plan: {
    name: string;
  };
}

interface IClient {
  invoke: (cmd: string, arg: any) => void;
  get: (getter: string) => any;
  metadata: () => IMetadata;
  request: <U>(data: Object) => Promise<U>;
}

interface Window {
  ZAFClient: {
    init: () => IClient;
  };
}
