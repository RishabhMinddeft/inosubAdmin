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

export const adminActions = {
    getNFTList,
}