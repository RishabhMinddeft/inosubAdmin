import { services } from '../services'
import { Toast } from '../helper/toastify.message'

const enableMetamask = () => {
    return (dispatch) => {
      const response = services.enableMetamask();
        response.then((promise) => {
            if (!promise.error) {
              dispatch({ type: 'LOGGED_IN', data: promise })
            } else {
              if (promise.error) Toast.error(promise.msg)
              dispatch({ type: 'LOGGED_IN_ERROR', data: promise })
            }
        });
    };
}

const enabledWalletConnect = () => {
  return (dispatch) => {
    const response = services.enabledWalletConnect();
    response.then((promise) => {
      if (promise) {
        dispatch({ type: 'LOGGED_IN', data: promise })
      } else {
        dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } })
      }
    })
  }
}

const getWeb3 = () => {
    return (dispatch) => {
      const response = services.getWeb3();
      response.then((promise) => {
        if (promise?.accounts[0]) {
            dispatch({ type: 'LOGGED_IN', data: promise })
        } else {
            dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } })
        }
      });
    };
}

const generateNonce = (address) => {
  return async (dispatch) => {
    const url = `user/genrateNonce/${address}`;
    const response = services.get(url);
    response.then((promise) => {
      if (promise?.status === 200) {
        dispatch({ type: 'GENERATE_NONCE', data: promise.data.data.nonce })
      } else {
        dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } })
      }
    });
  };
}

export const web3Actions = {
    enabledWalletConnect,
    enableMetamask,
    generateNonce,
    getWeb3,
}