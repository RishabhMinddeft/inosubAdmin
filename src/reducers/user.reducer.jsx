
export const fetchUser = function (state = null , action) {
    switch (action.type) {
        case 'USER_FETCHED':
            return action.data
        default:
            return state
    }
}

export const createNFT = function (state = null , action) {
    switch (action.type) {
        case 'CREATE_nft':
            return action.data
        default:
            return state
    }
}


export const singeNFTDetails = function (state = null , action) {
    switch (action.type) {
        case 'SINGLE_NFT_DETAILS':
            return action.data
        default:
            return state
    }
}