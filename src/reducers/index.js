import { combineReducers } from "redux";
import { dataRefresh, isAuthenticated, fetchNonce } from "./auth.reducer";
import { fetchNetworkId, fetchWeb3Data } from "./web3.reducer";
import { fetchUser } from "./user.reducer";

const rootReducer = combineReducers({
  dataRefresh,
  fetchNetworkId,
  isAuthenticated,
  fetchNonce,
  fetchWeb3Data,
  fetchUser,
});

export default rootReducer;
