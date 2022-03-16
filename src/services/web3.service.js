import { walletConnectModalInit, web3 } from '../web3';

async function getNetworkId() {
  try {
    return await web3.eth.getChainId();
  } catch (error) {
    return 1;
  }
}
async function getWeb3(disconnect) {
  if (disconnect)
    return {
      isLoggedIn: false,
      accounts: [],
    };
  if (web3) {
    let web3Data = {
      isLoggedIn: false,
      accounts: [],
    };
    try {
      const responseData = await web3.eth.getAccounts();
      if (responseData.length) {
        localStorage.setItem('disconnected', 0);
        web3Data.accounts = responseData;
        // web3Data.accounts = ['0x3536b3f6beb28415163c814fedf338617a8bce93'];
        web3Data.isLoggedIn = true;
        return web3Data;
      } else {
        return web3Data;
      }
    } catch {
      return web3Data;
    }
  }
}
async function enabledWalletConnect() {
  try {
    await walletConnectModalInit();
    const resp = await getWeb3();
    return resp;
  } catch (error) {
    if (error.code === -32002) {
      return {
        isLoggedIn: false,
        accounts: [],
      };
    }
    return {
      isLoggedIn: false,
      accounts: [],
    };
  }
}

async function enableMetamask() {
  // let ethereum = window.ethereum;
  try {
    await window.ethereum.send('eth_requestAccounts');
    const resp = await getWeb3();
    return resp;
  } catch (error) {
    if (error.code === -32002) {
      return {
        isLoggedIn: false,
        accounts: [],
      };
    }
    return {
      isLoggedIn: false,
      accounts: [],
    };
  }
}

async function getContractInstance(contractAbi, contractAddress) {
  try {
    if (web3) {
      const contractInstance = await new web3.eth.Contract(
        contractAbi,
        contractAddress
      );
      return contractInstance;
    }
  } catch (error) {
    // console.log(error);
  }
}

export const web3Services = {
  getNetworkId,
  enableMetamask,
  getContractInstance,
  enabledWalletConnect,
  getWeb3,
};
