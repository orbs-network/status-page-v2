export class Model {
  TimeSeconds = 0; // UTC seconds
  VirtualChains: {
    VirtualChainId: string;
    IsCanary: boolean;
  }[] = [];
}
