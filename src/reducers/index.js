import { combineReducers } from "redux";
import { dataRefresh, isAuthenticated, fetchNonce } from "./auth.reducer";
import { fetchNetworkId, fetchWeb3Data } from "./web3.reducer";
import { fetchUser , createNFT, singeNFTDetails, } from "./user.reducer";
import { fetchNFTList,updateProfile, registerProfile, } from "./admin.reducer";

const rootReducer = combineReducers({
  dataRefresh,
  fetchNetworkId,
  isAuthenticated,
  fetchNonce,
  fetchWeb3Data,
  fetchNFTList,
  fetchUser,
  createNFT,
  singeNFTDetails,
  updateProfile,
  registerProfile
});

export default rootReducer;
