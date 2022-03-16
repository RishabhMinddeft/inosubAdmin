export function fetchKYCData(state = { kycStatus: false }, action) {
  switch (action.type) {
    case "FETCH_KYC_DATA":
      return action.data;
    default:
      return state;
  }
}
export function fetchOpenPools(state = [], action) {
  switch (action.type) {
    case "FETCH_OPEN_POOLS":
      return action.data;
    default:
      return state;
  }
}
export function fetchClosedPools(state = [], action) {
  switch (action.type) {
    case "FETCH_CLOSED_POOLS":
      return action.data;
    default:
      return state;
  }
}
