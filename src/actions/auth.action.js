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

const generateSnapShot = (id) => {
  return (dispatch) => {
    let url = `/admin/gen-snapshot?projectId=${id}`;
    const response = services.get(url)
    response.then(async (promise) => {
      if (promise.status === 200) {
        console.log('api response : ', promise.data)
        dispatch({type: 'SNAPSHOT_GENERATED', data: true})
        Toast.success(promise.data.message)
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const getProjects =(id)=>{
  return (dispatch) => {
    let url = id ? `/project/list?createdBy=${id}`: `/project/list`;
    const response = services.get(url)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'PROJECTS_LIST', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}
const uploadSocialCSV = (csvData,selectedProjectId)=>{
  console.log("our");
  return (dispatch) => {
    var data = new FormData();
    data.append('csv', csvData);
    data.append('projectId', selectedProjectId);
    const params  = data;
    let url = `/admin/upload-social-raffle`;
    const response = services.post(url,params)
    response.then(async (promise) => {
      if (promise.status === 200) {
        dispatch({type: 'SOCIAL_CSV_DATA', data: true})
        Toast.success(promise.data.message)
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}
const fetchSnapshotWinnersData = (selectedProjectId )=>{
  console.log("our");
  return (dispatch) => {  
    let url = `/admin/get-whitelisted-user?projectId=${selectedProjectId}`;
    
    const response = services.get(url);
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'SNAPSHOT_WINNERS_DATA', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const addMerkleHash = (selectedProjectId, merkleHash)=>{
  console.log("our");
  return (dispatch) => {  
    const params = {
      projectId : selectedProjectId,
      rootHash : merkleHash
      }
    let url = `/project/edit`;
    const response = services.post(url,params)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'ADDED_MERKLE_HASH', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}
const getSnapShotData = (projectId)=>{
  return (dispatch) => {  
    let url = `/admin/get-snapshot-data?projectId=${projectId}`;
    const response = services.get(url)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'GET_SNAPSHOT_DATA', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const generateFileHash = (allocationdata)=>{
  return (dispatch) => {  
    let url = `/admin/gen-filehash`;
    const response = services.post(url,allocationdata)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'GENERATE_FILE_HASH', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

const generateLottery = (projectId,allocationdata)=>{
  return (dispatch) => {  
    let url = `/admin/gen-lottery?projectId=${projectId}&requestNo=${allocationdata}`;
    const response = services.post(url,allocationdata)
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'GENERATE_LOTTERY', data: promise.data.data})
        }
      } else {
        // console.log("error");
        Toast.error('Something went wrong.!')
      }
    });
  };
}

export const authActions = {
  generateLottery,
  generateFileHash,
   getSnapShotData,
   addMerkleHash,
   fetchSnapshotWinnersData,
   uploadSocialCSV,
    getAdminProjects,
    getUser,
    authLogin,
    createNFT,
    getSingleNFTDetails,
    getUnapprovedSubAdmins,
    updateNFT,
    createProject,
    getProjects,
    generateSnapShot,
}