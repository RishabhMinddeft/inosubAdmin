
export const fetchNFTList = function (state = null , action) {
    switch (action.type) {
        case 'NFT_LIST_FETCHED':
            return action.data
        default:
            return state
    }
}