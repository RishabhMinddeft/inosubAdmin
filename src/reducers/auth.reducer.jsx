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

export const socialCSVData= function (state = null, action) {
  switch (action.type) {
    case 'SOCIAL_CSV_DATA':
      return action.data
    default:
      return state
  }
}

export const snapshotWinnersData= function (state = null, action) {
  switch (action.type) {
    case 'SNAPSHOT_WINNERS_DATA':
      return action.data
    default:
      return state
  }
}

export const snapshotData= function (state = null, action) {
  switch (action.type) {
    case 'GET_SNAPSHOT_DATA':
      return action.data
    default:
      return state
  }
}
