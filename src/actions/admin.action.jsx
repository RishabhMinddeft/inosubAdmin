import { Toast } from '../helper/toastify.message'
import { services } from '../services'


const getNFTList = () => {
    return (dispatch) => {
      const response = services.get('nft/list')
      response.then(async (promise) => {
        if (promise.status === 200) {
          if (promise.data.data) {
            dispatch({type: 'NFT_LIST_FETCHED', data: promise.data.data})
          }
        } else {
          // console.log("error");
          Toast.error('Something went wrong.!')
        }
      });
    };
}

const profileUpdate = (params) => {
  return (dispatch) => {
    const response = services.post('admin/edit', params)
    response.then(async (promise) => {
      if (promise.status === 200) {
        dispatch({type: 'PROFILE_UPDATED', data: true})
        dispatch({type: 'USER_FETCHED', data: promise.data.data})
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const profileRegister = (params) => {
  return (dispatch) => {
    const response = services.post('admin/create', params)
    response.then(async (promise) => {
      // if (promise.status === 400) {
      //   dispatch({type: 'PROFILE_REGISTERED', data: promise.data })
      // }
       
      if (promise.status === 200) {
        dispatch({type: 'PROFILE_REGISTERED', data: true})
      } else {
        dispatch({type: 'PROFILE_REGISTERED', data: promise.data })
      }
      //  else {
      //   // console.log("error");
      //   Toast.error('Something went wrong.!')
      // }
    });
  };
}

export const adminActions = {
    getNFTList,
    profileUpdate,
    profileRegister,
}