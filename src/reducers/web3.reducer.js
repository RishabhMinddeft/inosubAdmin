export function fetchNetworkId(state = null, action) {
  switch (action.type) {
    case "FETCH_NETWORK_ID":
      return action.data;
    default:
      return state;
  }
}

export function fetchWeb3Data(
  state = {
    isLoggedIn: false,
    accounts: [],
    role: null,
  },
  action
) {
  switch (action.type) {
    case "FETCH_WEB3_DATA":
      return action.data;
    default:
      return state;
  }
}
