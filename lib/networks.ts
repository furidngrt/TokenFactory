export type NetworkType = {
  name: string
  rpcUrl: string
  chainId: number
  currency: string
  factoryAddress: string
  explorer: string
  icon: string
  type: "mainnet" | "testnet"
}

const NETWORKS: Record<string, NetworkType> = {
  galileo: {
    name: "0G Galileo",
    rpcUrl: "https://evmrpc-testnet.0g.ai",
    chainId: 80087,
    currency: "OG",
    factoryAddress: "0x55577e04DAe968f6A1c06C6D74De834c294D2B3E",
    explorer: "https://chainscan-galileo.0g.ai",
    icon: "https://pbs.twimg.com/profile_images/1841632086475866113/n6vPDZqb_400x400.jpg",
    type: "testnet",
  },
  berachain: {
    name: "Berachain",
    rpcUrl: "https://rpc.berachain.com/",
    chainId: 80094,
    currency: "BERA",
    factoryAddress: "0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E",
    explorer: "https://berascan.com/",
    icon: "https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg",
    type: "mainnet",
  },
  soneium: {
    name: "Soneium",
    rpcUrl: "https://rpc.soneium.org/",
    chainId: 1868,
    currency: "ETH",
    factoryAddress: "0x662B14a3579A05D025209fFfB9840117a149D67e",
    explorer: "https://soneium.blockscout.com/",
    icon: "https://pbs.twimg.com/profile_images/1911445630959943680/lzpY1muL_400x400.jpg",
    type: "mainnet",
  },
  ink: {
    name: "Ink",
    rpcUrl: "https://rpc-gel.inkonchain.com",
    chainId: 57073,
    currency: "ETH",
    factoryAddress: "0x196caF32513aa0172Fa8d7add734B6EDB0b17de2",
    explorer: "https://explorer.inkonchain.com/",
    icon: "https://pbs.twimg.com/profile_images/1851260672354480128/K6ZudYbl_400x400.jpg",
    type: "mainnet",
  },
  unichain: {
    name: "Unichain",
    rpcUrl: "https://mainnet.unichain.org",
    chainId: 130,
    currency: "ETH",
    factoryAddress: "0x55577e04DAe968f6A1c06C6D74De834c294D2B3E",
    explorer: "https://uniscan.xyz",
    icon: "https://pbs.twimg.com/profile_images/1844360745649057798/iwEWAS02_400x400.jpg",
    type: "mainnet",
  },
  linea: {
    name: "Linea",
    rpcUrl: "https://linea-mainnet.infura.io/",
    chainId: 59144,
    currency: "ETH",
    factoryAddress: "0x382C4E2964C5507BF798838a7Bc0081aa8e50e0B",
    explorer: "https://lineascan.build",
    icon: "https://pbs.twimg.com/profile_images/1882602161378373632/xbIeaav1_400x400.png",
    type: "mainnet",
  },
  monad: {
    name: "Monad Testnet",
    rpcUrl: "https://testnet-rpc.monad.xyz/",
    chainId: 10143,
    currency: "MON",
    factoryAddress: "0x3f6D80eB7518A4eB28c0Eb7d36c9Fa9B7b1b5b8F",
    explorer: "https://testnet.monadexplorer.com",
    icon: "https://pbs.twimg.com/profile_images/1877532281419739137/I_t8rg_V_400x400.jpg",
    type: "testnet",
  },
  story: {
    name: "Story",
    rpcUrl: "https://mainnet.storyrpc.io",
    chainId: 1514,
    currency: "IP",
    factoryAddress: "0xb2A5b690ed415Ba718F3aC33C0fd65c817EC41b4",
    explorer: "https://storyscan.xyz/",
    icon: "https://pbs.twimg.com/profile_images/1820303986349805569/MKfPfLtz_400x400.jpg",
    type: "mainnet",
  },
  sonic: {
    name: "Sonic",
    rpcUrl: "https://rpc.soniclabs.com",
    chainId: 146,
    currency: "S",
    factoryAddress: "0x601abbC6977CbfD28c84dcD4c2e75443888482d9",
    explorer: "https://sonicscan.org/",
    icon: "https://pbs.twimg.com/profile_images/1886106303262490624/3rEXurVD_400x400.jpg",
    type: "mainnet",
  },
  megaeth: {
    name: "Megaeth",
    rpcUrl: "https://carrot.megaeth.com/rpc",
    chainId: 6342,
    currency: "ETH",
    factoryAddress: "0x3f6D80eB7518A4eB28c0Eb7d36c9Fa9B7b1b5b8F",
    explorer: "https://www.megaexplorer.xyz/",
    icon: "https://pbs.twimg.com/profile_images/1861751545790070784/KvlxTzAq_400x400.jpg",
    type: "mainnet",
  },
  teasepolia: {
    name: "Tea Sepolia",
    rpcUrl: "https://tea-sepolia.g.alchemy.com/public",
    chainId: 10218,
    currency: "TEA",
    factoryAddress: "0x2F3754Cb1F05fE6701C76603B1c69830347F5B3A",
    explorer: "https://sepolia.tea.xyz/",
    icon: "https://pbs.twimg.com/profile_images/1708838507957882880/SsQYN3T6_400x400.jpg",
    type: "testnet",
  },
}

export default NETWORKS
