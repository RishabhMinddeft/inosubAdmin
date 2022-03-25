import { combineReducers } from "redux";
import { dataRefresh, isAuthenticated, fetchNonce } from "./auth.reducer";
import { fetchNetworkId, fetchWeb3Data } from "./web3.reducer";

const rootReducer = combineReducers({
  dataRefresh,
  fetchNetworkId,
  isAuthenticated,
  fetchNonce,
  fetchWeb3Data,
});

export default rootReducer;
