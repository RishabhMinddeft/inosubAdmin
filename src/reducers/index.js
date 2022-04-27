import { combineReducers } from "redux";
import { dataRefresh, isAuthenticated, fetchNonce } from "./auth.reducer";
import { fetchNetworkId, fetchWeb3Data } from "./web3.reducer";
import { fetchUser , createNFT, singeNFTDetails, unapprovedSubAdmins ,updatedNFT } from "./user.reducer";
import { fetchNFTList,updateProfile, registerProfile, collectionList } from "./admin.reducer";

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
  registerProfile,
  unapprovedSubAdmins,
  updatedNFT,
  collectionList,
});

export default rootReducer;
