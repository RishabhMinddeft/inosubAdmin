import { services } from '../services';

function fetchUserBalances(data) {
  return {
    type: 'FETCH_USER_BALANCES', // dispatch user login event
    data: data,
  };
}

function setDispatchData(data, type) {
  return { data: data, type: type };
}

// get defi categories
function getNetworkId() {
  return (dispatch) => {
    const response = services.getNetworkId();
    response.then((promise) => {
      dispatch(setDispatchData(promise, 'FETCH_NETWORK_ID'));
    });
  };
}

function getWeb3(val) {
  if (val) {
    return (dispatch) => {
      dispatch(
        setDispatchData(
          {
            isLoggedIn: false,
            accounts: [],
          },
          'FETCH_WEB3_DATA'
        )
      );
    };
  } else
    return (dispatch) => {
      const response = services.getWeb3();
      response.then((promise) => {
        if (promise.accounts[0]) {
          dispatch(setDispatchData(promise, 'FETCH_WEB3_DATA'));
        } else {
          // console.log('errorrrr in actions');
        }
      });
    };
}

function enableMetamask() {
  return (dispatch) => {
    const response = services.enableMetamask();
    response.then((promise) => {
      if (promise) {
        dispatch(setDispatchData(promise, 'FETCH_WEB3_DATA'));
      } else {
        // console.log('error in actions');
      }
    });
  };
}
function enabledWalletConnect() {
  return (dispatch) => {
    const response = services.enabledWalletConnect();
    response.then((promise) => {
      if (promise) {
        dispatch(setDispatchData(promise, 'FETCH_WEB3_DATA'));
      } else {
        // console.log('error in actions');
      }
    });
  };
}
function getUserBalances(userAddress) {
  return (dispatch) => {
    const response = services.getUserBalances(userAddress);
    response.then((promise) => {
      if (promise) {
        dispatch(fetchUserBalances(promise));
      } else {
        // console.log('error in actions');
      }
    });
  };
}
function getOpenPools() {
  return (dispatch) => {
    const response = services.get(
      `https://snapshotapi.seedify.info/api/v1/pools/farming`
    );
    return response.then((promise) => {
      if (promise.data) {
        dispatch(setDispatchData(promise.data.data, 'FETCH_OPEN_POOLS'));
      } else {
        // console.log('error in getBanners actions');
      }
    });
  };
}
function getClosedPools() {
  return (dispatch) => {
    const response = services.get(
      `https://snapshotapi.seedify.info/api/v1/pools/farming?status=closed`
    );
    return response.then((promise) => {
      if (promise.data) {
        dispatch(setDispatchData(promise.data.data, 'FETCH_CLOSED_POOLS'));
      } else {
        // console.log('error in getBanners actions');
      }
    });
  };
}

// function getTokenContractInstance() {
//   const { tokenContract } = contractAddresses();
//   return (dispatch) => {
//     const response = services.getContractInstance(
//       tokenContractABI,
//       tokenContract
//     );
//     // const response = services.getTokenContractInstance();
//     response.then((promise) => {
//       if (promise) {
//         dispatch(fetchTokenContractInstance(promise));
//       } else {
//         console.log("error in actions");
//       }
//     });
//   };
// }
// function getLiquidityContractInstance() {
//   let { liquidity } = contractAddresses();
//   return (dispatch) => {
//     const response = services.getContractInstance(
//       liquidityContractABI,
//       liquidity
//     );
//     response.then((promise) => {
//       if (promise) {
//         dispatch(fetchLiquidityContractInstance(promise));
//       } else {
//         console.log("error in actions");
//       }
//     });
//   };
// }
// function getLiquidityTokenContractInstance() {
//   let { liquidityTokenContract } = contractAddresses();
//   return (dispatch) => {
//     const response = services.getContractInstance(
//       liquidityTokenContractABI,
//       liquidityTokenContract
//     );
//     response.then((promise) => {
//       if (promise) {
//         dispatch(fetchLiquidityTokenContractInstance(promise));
//       } else {
//         console.log("error in actions");
//       }
//     });
//   };
//

export const web3Actions = {
  getNetworkId,
  getWeb3,
  enableMetamask,
  getUserBalances,
  enabledWalletConnect,
  // getOpenPools,
  // getClosedPools,
};
