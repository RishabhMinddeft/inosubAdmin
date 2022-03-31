import { Toast } from '../helper/toastify.message'
import { services } from '../services'

const authLogin
 = (nonce, signature) => {
    return (dispatch) => {
        const url = 'admin/login'
        let params = JSON.stringify({ nonce: nonce, signature: signature })
        const response = services.post(url, params)
        response.then(async (promise) => {
          if (promise.status === 200) {
            localStorage.setItem('liquidToken', promise.data.data.token) // store user auth token 
            if (promise.data.data.token) {
              const newresp = await services.getWeb3(true)
              localStorage.setItem('userAddress', newresp.accounts[0]) // store user address
              localStorage.setItem('userId', promise.data.data._id) // store user id
              dispatch({ type: 'LOGGED_IN', data: newresp })
              dispatch({ type: 'USER_FETCHED', data: promise.data.data })
            }
            Toast.success('User Connected Successfully')
          } else {
            localStorage.setItem('liquidToken', '');
          }
        });
      };
}
// function createNFT(data) {
//   return (dispatch) => {
//     const url = `nft/updateNft/${data.id}`;
//     const response = services.put(url, data).then((response) => {
//       if (response.status === 200) {
//         dispatch(setData(response.data, "UPDATE_NFT"));
//       }
//       if (response.response && response.response.status === 403) {
//         dispatch(setData(response.response.data, "UPDATE_NFT"));
//       }
//       if (response.response && response.response.status === 400) {
//         dispatch(setData(response.response.data, "UPDATE_NFT"));
//       }
//     });
//   };
// }

const getUser = () => {
  return (dispatch) => {
    let userID = localStorage.getItem('userId')
    const response = services.get('admin/single/'+userID)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'USER_FETCHED', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

export const authActions = {
    getUser,
    authLogin,
    // createNFT
}