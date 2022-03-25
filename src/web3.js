import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';

import { rpcUrls } from './config';


// let web3 = null;
// let walletConnectProvider = new WalletConnectProvider({
//   rpc: {
//     chainIdHex: rpcUrls, // BSC Mainnet rpc url
//   },
//   chainId: chainId, // BSC Testnet chainId
//   qrcode: false
// })

let web3 = null;
let walletConnectProvider = new WalletConnectProvider({
  rpc: {
    0x38: 'https://speedy-nodes-nyc.moralis.io/5be1af5bcc43ff8e4432ee14/bsc/mainnet/archive', // BSC Mainnet chainId - 56
    // 0x61: 'https://data-seed-prebsc-1-s1.binance.org:8545/', // BSC Testnet chainId - 97
  },
  chainId: 56, // BSC Mainnet
  // chainId: 0x61, // BSC Testnet
  qrcode: false,
});

const metamaskConnectInit = () => {
  // Check if Web3 has been injected by the browser (Mist/MetaMask).
  return new Promise((resolve, reject) => {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(window.web3.currentProvider)
      resolve(true)
    } else {
      // Handle the case where the user doesn't have web3. Probably
      // show them a message telling them to install Metamask in
      // order to use the app.
      web3 = new Web3(
        new Web3.providers.HttpProvider(
          rpcUrls
        )
      )
      reject(false)
    }
  })
}

const walletConnectInit = () => {
  // Check if WalleConnect has been conected by the website
  return new Promise((resolve, reject) => {
    if (walletConnectProvider.connector.connected) {
      // Use WalletConnect provider.
      walletConnectProvider.enable()
      web3 = new Web3(walletConnectProvider)
      resolve(true)
    }
    reject(false)
  })
}


const walletConnectModalInit = () => {
  return new Promise((resolve, reject) => {
    walletConnectProvider.enable()
    web3 = new Web3(walletConnectProvider)
    // Wallet Connect Provider Events
    walletConnectProvider.connector.on('display_uri', (err, payload) => {
      const uri = payload.params[0]
      WalletConnectQRCodeModal.open(uri)
    })
    walletConnectProvider.on('connect', () => {
      WalletConnectQRCodeModal.close() // close the QR scanner modal
    })
    walletConnectProvider.on('disconnect', (code, reason) => {
      localStorage.removeItem('walletconnect')
    })
    resolve(true)
  })
}

if (!web3) {
  if (JSON.parse(localStorage.getItem('walletconnect'))?.connected) {
    localStorage.setItem('isDisconnect', '0')
    walletConnectInit()
  } else metamaskConnectInit()
}

export {
  web3,
  walletConnectProvider,
  walletConnectInit,
  metamaskConnectInit,
  walletConnectModalInit,
}
