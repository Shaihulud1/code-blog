
type RefreshTokenState = {
    refreshToken: string
}
const state: RefreshTokenState = {
  refreshToken: ''
}

const getters = {
  getRefreshToken (state: RefreshTokenState): string {
    return state.refreshToken
  }
}

const mutations = {
  mutateRefreshToken (state: RefreshTokenState, newRefreshToken: string) {
    state.refreshToken = newRefreshToken
  }
}
const actions = {
  setRefreshToken (context: any, newRefreshToken: string) {
    context.commit('mutateRefreshToken', newRefreshToken)
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
