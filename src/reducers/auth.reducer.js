export const isAuthenticated = function (state = { isLoggedIn: false, accounts: [] }, action) {
  switch (action.type) {
      case 'LOGGED_IN':
          return { ...action.data }
      case 'LOGGED_IN_ERROR':
          return { ...action.data }
      case 'LOGGED_OUT':
          return { ...action.data }
      default:
          return state
}
}

export const dataRefresh = function (state = false , action) {
  switch (action.type) {
      case 'DATA_REFRESH':
          return true
      case 'DATA_REFRESHED':
          return false
      default:
          return state
  }
}

export const fetchNonce = function (state = null, action) {
  switch (action.type) {
    case 'GENERATE_NONCE':
      return action.data
    default:
      return state
  }
}
