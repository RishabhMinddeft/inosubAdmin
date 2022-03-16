import { services } from "../services";

export const authActions = {
  getKYCData,
  getAdminList,
};

function fetchedData(type, data) {
  return {
    type: type,
    data: data,
  };
}
function getAdminList(){
  // /marketplace/admin/list
  return (dispatch) => {
    const response = services.get(
      `https://snapshotapi.seedify.info/api/v1/block/check/${address}`
    );
    // https://snapshotapi.seedify.info/api/v1/pools/farming
    return response.then((promise) => {
      if (promise.data) {
        dispatch(fetchedData("FETCH_KYC_DATA", promise.data.data));
      } else {
        // console.log('error in getBanners actions');
      }
    });
  };
}
function getKYCData(address) {
  return (dispatch) => {
    const response = services.get(
      `https://snapshotapi.seedify.info/api/v1/block/check/${address}`
    );
    // https://snapshotapi.seedify.info/api/v1/pools/farming
    return response.then((promise) => {
      if (promise.data) {
        dispatch(fetchedData("FETCH_KYC_DATA", promise.data.data));
      } else {
        // console.log('error in getBanners actions');
      }
    });
  };
}
