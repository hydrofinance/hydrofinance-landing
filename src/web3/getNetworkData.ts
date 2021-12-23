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
      return "0xa7324C8c487fdA048363386181b3F7c57BA6263c";
    case 1287:
      return null;
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

export const getNetworkRewardPairs = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return ["0xDCd92eb568157D3c1a6b3AE53ADF18a230bc304A"];
    case 1287:
      return null;
    default:
      return null;
  }
};

export const getNetworkDistributors = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return ["0xB7Cb2440b5fD5B9CbeCd7e63c4d88d497a6D22fB", "0x905EB65395465B4f7380a0fbb84707D38307AD69"];
    case 1287:
      return null;
    default:
      return null;
  }
};

const networkTxUrls: { [networkId: number]: (hash: string) => string } = {
  1285: (hash: string) => `https://moonriver.moonscan.io/tx/${hash}`,
  1287: (hash: string) => `https://moonbase.moonscan.io/tx/${hash}`,
};
export const getNetworkTxUrl = (networkId: number) => networkTxUrls[networkId];
