import { Toast } from '../helper/toastify.message'
import { services } from '../services'

const authLogin = (nonce, signature) => {
    return (dispatch) => {
        const url = 'user/login'
        let params = JSON.stringify({ nonce: nonce, signature: signature })
        const response = services.post(url, params)
        response.then(async (promise) => {
          if (promise.status === 200) {
            localStorage.setItem('liquidToken', promise.data.data.token)
            if (promise.data.data.token) {
              const newresp = await services.getWeb3(true)
              localStorage.setItem('userAddress', newresp.accounts[0]);
              dispatch({ type: 'LOGGED_IN', data: newresp });
            }
            Toast.success('User logged in')
          } else {
            localStorage.setItem('liquidToken', '');
          }
        });
      };
}
function createNFT(data) {
  return (dispatch) => {
    const url = `nft/updateNft/${data.id}`;
    const response = services.put(url, data).then((response) => {
      if (response.status === 200) {
        dispatch(setData(response.data, "UPDATE_NFT"));
      }
      if (response.response && response.response.status === 403) {
        dispatch(setData(response.response.data, "UPDATE_NFT"));
      }
      if (response.response && response.response.status === 400) {
        dispatch(setData(response.response.data, "UPDATE_NFT"));
      }
    });
  };
}

export const authActions = {
    authLogin,
    createNFT
}