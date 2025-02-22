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
    factoryAddress: "0x196caF32513aa0172Fa8d7add734B6EDB0b17de2",
    explorer: "https://explorer.inkonchain.com/",
  },
  unichain: {
    name: "Unichain Mainnet",
    rpcUrl: "https://mainnet.unichain.org",
    chainId: 130,
    currency: "ETH",
    factoryAddress: "0x55577e04DAe968f6A1c06C6D74De834c294D2B3E",
    explorer: "https://uniscan.xyz",
  },
  linea: {
    name: "Linea Mainnet",
    rpcUrl: "https://linea-mainnet.infura.io/",
    chainId: 59144,
    currency: "ETH",
    factoryAddress: "0x382C4E2964C5507BF798838a7Bc0081aa8e50e0B",
    explorer: "https://lineascan.build",  
  },
  monad: {
    name: "Monad Testnet",
    rpcUrl: "https://testnet-rpc.monad.xyz/",
    chainId: 10143,
    currency: "MON",
    factoryAddress: "0x3f6D80eB7518A4eB28c0Eb7d36c9Fa9B7b1b5b8F",
    explorer: "https://testnet.monadexplorer.com",  
  },
};

export default NETWORKS;
