type UserDataType = {
    id: string,
    fullName: string,
}
type UserDataStateType = {
    userData?: UserDataType
}

const getUserDataStore = () => {
    let userDat = window.localStorage.getItem('userData')
    if (typeof userDat === 'string') {
        try {
            userDat = JSON.parse(userDat)
        } catch {
            return undefined
        }
    }
    if (typeof userDat === 'object' && userDat !== null && userDat['id'] && userDat['fullName']) {
        return userDat
    }
    return undefined
}

const state: UserDataStateType = {
    userData: getUserDataStore()
}

const getters = {
    getUserData (state: UserDataStateType): UserDataType | undefined {
        return state.userData
    }
}

const mutations = {
    mutateUserData (state: UserDataStateType, newUserdata: UserDataType | undefined): void {
        localStorage.setItem('userData', JSON.stringify(newUserdata))
        state.userData = newUserdata
    }
}
const actions = {
    setUserData (
        context: {commit(mutation: string, object: UserDataType | undefined): void}, 
        newUserdata: UserDataType | undefined
    ): void {
        context.commit('mutateUserData', newUserdata)
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}
  