type Metadata<T> = {
  appId: number;
  installationId: number;
  name: string;
  plan: {
    name: string;
  };
  settings?: T;
};
