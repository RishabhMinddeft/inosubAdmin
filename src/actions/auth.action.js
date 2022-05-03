import { Toast } from '../helper/toastify.message'
import { services } from '../services'

const authLogin
 = (nonce, signature) => {
    return (dispatch) => {
        const url = 'admin/login'
        let params = JSON.stringify({ nonce: nonce, signature: signature })
        const response = services.post(url, params)
        response.then(async (promise) => {
          if (promise?.status === 200) {
            console.log("response", promise.data.data.role)
            localStorage.setItem("inoRole",promise.data.data.role)
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
            localStorage.setItem("inoRole","")
          }
        });
      };
}

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
const createNFT = (params) => {
  return (dispatch) => {
    let url = '/nft/create';
    const response = services.post(url,params)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'CREATE_nft', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const createProject = (params) => {
  return (dispatch) => {
    let url = '/project/create';
    const response = services.post(url,params)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'CREATE_PROJECT', data: true })
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}
const updateNFT = (params) => {
  return (dispatch) => {
    let url = '/nft/mint';
    const response = services.post(url,params)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'UPDATE_NFT', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const getSingleNFTDetails=(id)=>{
  // const response = services.get('/nft/list')
  // console.log(response);
  return (dispatch) => {
    let url = `/nft/single/${id}`;
    const response = services.get(url)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'SINGLE_NFT_DETAILS', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}
const getUnapprovedSubAdmins=(id)=>{
  // const response = services.get('/nft/list')
  // console.log(response);
  return (dispatch) => {
    let url = `/admin/list`;
    const response = services.get(url)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'UNAPPROVED_SUBADMIN_LIST', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}
const getAdminProjects=(id)=>{
  // const response = services.get('/nft/list')
  // console.log(response);
  return (dispatch) => {
    let url = `project/list?createdBy=${id}`;
    const response = services.get(url)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'ADMIN_PROJECTS', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

export const authActions = {
    getAdminProjects,
    getUser,
    authLogin,
    createNFT,
    getSingleNFTDetails,
    getUnapprovedSubAdmins,
    updateNFT,
    createProject
}