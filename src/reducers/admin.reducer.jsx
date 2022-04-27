
export const fetchNFTList = function (state = null , action) {
    switch (action.type) {
        case 'NFT_LIST_FETCHED':
            return action.data
        default:
            return state
    }
}

export function updateProfile(state = null, action) {
    switch (action.type) {
      case 'PROFILE_UPDATED':
        return action.data;
      default:
        return state;
    }
  }

export function registerProfile(state = null, action) {
  switch (action.type) {
    case 'PROFILE_REGISTERED':
      return action.data;
    default:
      return state;
  }
}

export function collectionList(state = null, action) {
  switch (action.type) {
    case 'COLLECTION_LIST_FETCHED':
      return action.data;
    default:
      return state;
  }
}