import { ICoreOptions } from "web3modal";

export const getNetworkConnectors = (): Partial<ICoreOptions> => ({
  network: "moonriver",
  cacheProvider: true,
  providerOptions: {
    injected: {
      package: null,
      display: {
        name: "Injected",
      },
    },
  },
});

export const isValidNetworkId = (networkId: number) =>
  [1285, 1287].includes(networkId);

export const getNetworkPair = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x6F0c50fB6270F206a074F8058f165720c7a9761c";
    case 1287:
      return "0x78d67A62B85533d17774037DbFE69fD5e3633d90";
    default:
      return null;
  }
};

export const getNetworkV1TokenAddress = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0xDC151BC48a5F77288cdE9DdbFf2e32e6bcF4791F";
    case 1287:
      return "0x93E737101480C503d31cbd1998Aa839AA4f0cB5C";
    default:
      return null;
  }
};

export const getNetworkV2TokenAddress = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x56cfe76545939AFAbc8BDbA94192A96801D24d28";
    case 1287:
      return "0x3A2101FE4a9FA842FA31a599dd698DE61c281EDD";
    default:
      return null;
  }
};

export const getNetworkV2MigratorAddress = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x2613Db0D14c90b1fFcCc754D299C8AF7d2A8aFCc";
    case 1287:
      return "0x19de56C7Ac0B95f516f54DD9aC6C8978E02fd279";
    default:
      return null;
  }
};

export const getNetworkAirdropAddress = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x0D5C0Cd9e1f1C315B1AeDFe4C5DdC677E082F1aA";
    case 1287:
      return "0xaC1fD1ECc463A7d2CCA77006E314D645B4766E9E";
    default:
      return null;
  }
};

export const getNetworkDistributorPlugin = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x141ABcA2B12928e054Dd45Fbc3036e2c570f2f95";
    case 1287:
      return null;
    default:
      return null;
  }
};

export const getNetworkMulticall = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x5f9Af1Fdc4eb0B0b3E3263e19030c1A0Da4121Fc";
    case 1287:
      return "0x3C8c1948D959Ec186d35dDC26280D48100A81101";
    default:
      throw Error(`Multicall not configured for network id ${networkId}`);
  }
};

export const getFinnAddress = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x9A92B5EBf1F6F6f7d93696FCD44e5Cf75035A756";
    case 1287:
      return "0x31b1644f8379a22d25f845a67f1ab346e76001aa";
    default:
      return null;
  }
};

export const getHydroRouter = (networkId: number) => {
  switch (networkId) {
    case 1287:
      return "0x4032D8252FaA1A84B699e883cB38b8a4CFc620d2";
    default:
      return null;
  }
};

const networkTxUrls: { [networkId: number]: (hash: string) => string } = {
  1285: (hash: string) => `https://moonriver.moonscan.io/tx/${hash}`,
  1287: (hash: string) => `https://moonbase.moonscan.io/tx/${hash}`,
};
export const getNetworkTxUrl = (networkId: number) => networkTxUrls[networkId];
