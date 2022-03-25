import { web3, walletConnectModalInit } from '../web3'
import { chainId } from '../config'

async function getNetworkId() {
  try {
    return await window.ethereum.request({ method: 'eth_chainId' });
  } catch (error) {
    return 1;
  }
}

const getWeb3 = async (isAuthenticate) => {
  if (web3) {
    let web3Data = {
      isLoggedIn: false,
      accounts: [],
      role: null,
    }
    try {
      const responseData = await web3.eth.getAccounts()
      const resp = await web3.eth.net.getId()
      if (responseData.length && resp === chainId) {
        web3Data.accounts = responseData;
        
        // if (isAuthenticate || localStorage.getItem('liquidToken')) {
        //   web3Data.isLoggedIn = true;
        // }

        web3Data.isLoggedIn = true;
        // check user role ? 'super' || 'sub'
        web3Data.role = 'super' // web3Data.role = 'sub'
        return web3Data
      } else {
        return web3Data
      }
    } catch {
      return web3Data
    }
  }
}

const enabledWalletConnect = async () => {
  try {
    await walletConnectModalInit()
    const resp = await getWeb3()
    return resp
  } catch (error) {
    if (error.code === -32002) {
      return {
        isLoggedIn: false,
        accounts: [],
        role: null,
      }
    }
    return {
      isLoggedIn: false,
      accounts: [],
      role: null,
    }
  }
}

const enableMetamask = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts'})
    localStorage.setItem('isDisconnect', '0')
    const resp = await getWeb3()
    return resp
  } catch (error) {
    if (error.code === -32002) {
      return {
        error: true,
        code: error.code,
        msg: error.message,
        isLoggedIn: false,
        accounts: [],
        role: null,
      }
    }
    if (error.code === 4001) {
      return {
        error: true,
        code: error.code,
        msg: error.message,
        isLoggedIn: false,
        accounts: [],
        role: null,
      }
    }
    return {
      error: true,
      code: error.code,
      msg: error.message,
      isLoggedIn: false,
      accounts: [],
      role: null,
    }
  }
}

export const web3Services = {
  enabledWalletConnect,
  enableMetamask,
  getNetworkId,
  getWeb3,
}
