import axios from 'axios';

// backend api url
export const api = axios.create({
  // baseURL: 'http://localhost:4000/api/v1', // Local system url
  baseURL: 'http://ec2-18-191-95-183.us-east-2.compute.amazonaws.com:4000/api/v1', // Server url 
});

// web3 data for BSC Mainnet
export const chainId = 56;
export const chainIdHex = '0x38'; 
export const rpcUrls = 'https://bsc-dataseed.binance.org/';
export const currency_symbol = 'BNB';
export const network_name = 'Smart Chain';
export const transactionLink = 'https://bscscan.com/tx';
export const explorerLinks = 'https://bscscan.com';