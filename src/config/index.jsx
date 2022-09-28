import axios from "axios";

// backend api url
export const api = axios.create({
  // baseURL: "https://inoapi.seedify.info/api/v1/", // Server url
  baseURL: "https://inoapi.seedify.fund/api/v1",
});

// web3 data for BSC Mainnet
export const chainId = 56;
export const chainIdHex = "0x38";
export const rpcUrls = "https://bsc-dataseed1.ninicoin.io";
// "https://speedy-nodes-nyc.moralis.io/5be1af5bcc43ff8e4432ee14/bsc/mainnet/archive";
export const currency_symbol = "BNB";
export const network_name = "Smart Chain";
export const transactionLink = "https://bscscan.com/tx";
export const explorerLinks = "https://bscscan.com";

// fetch listing urls
export const nftList = "/nft/list";

// ipfs public url
export const ipfsURL = "https://ipfs.io/ipfs/";

// user role
export const subAdminRole = "SUBADMIN";

// users roles
export const SUPERADMIN = "SUPERADMIN";
export const SUBADMIN = "SUBADMIN";
