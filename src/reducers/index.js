import { combineReducers } from "redux";
import { fetchKYCData, fetchClosedPools, fetchOpenPools } from "./auth.reducer";
import { fetchNetworkId, fetchWeb3Data } from "./web3.reducer";

const rootReducer = combineReducers({
  fetchKYCData,
  fetchNetworkId,
  fetchClosedPools,
  fetchOpenPools,
  fetchWeb3Data,
});

export default rootReducer;
