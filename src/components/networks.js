const NETWORKS = {
  berachain: {
    name: "Berachain",
    rpcUrl: "https://rpc.berachain.com/",
    chainId: 80094,
    currency: "BERA",
    factoryAddress: "0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E",
    explorer: "https://berascan.com/",
  },
  soneium: {
    name: "Soneium",
    rpcUrl: "https://rpc.soneium.org/",
    chainId: 1868,
    currency: "ETH",
    factoryAddress: "0x662B14a3579A05D025209fFfB9840117a149D67e",
    explorer: "https://soneium.blockscout.com/",
  },
  ink: {
    name: "Ink",
    rpcUrl: "https://rpc-gel.inkonchain.com",
    chainId: 57073,
    currency: "ETH",
    factoryAddress: "0xa17F17B67eAF5510e35CAdf949609ef80f3ac968",
    explorer: "https://explorer.inkonchain.com/",
  },
};

export default NETWORKS;
