
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

export const unapprovedSubAdmins = function (state = null , action) {
    switch (action.type) {
        case 'UNAPPROVED_SUBADMIN_LIST':
            return action.data
        default:
            return state
    }
}
export const snapGenerated = function (state = false , action) {
    switch (action.type) {
        case 'SNAPSHOT_GENERATED':
            return action.data
        default:
            return state
    }
}
export const allProjects = function (state = null , action) {
    switch (action.type) {
        case 'PROJECTS_LIST':
            return action.data
        default:
            return state
    }
}

export const updatedNFT = function (state = null , action) {
    switch (action.type) {
        case 'UPDATE_NFT':
            return action.data
        default:
            return state
    }
}

export const createProject = function (state = false, action) {
    switch (action.type) {
        case 'CREATE_PROJECT':
            return action.data
        default:
            return state
    }
}
export const adminProjects = function (state = [], action) {
    switch (action.type) {
        case 'ADMIN_PROJECTS':
            return action.data
        default:
            return state
    }
}

export const addedMerkleHash = function (state = [], action) {
    switch (action.type) {
        case 'ADDED_MERKLE_HASH':
            return action.data
        default:
            return state
    }
}