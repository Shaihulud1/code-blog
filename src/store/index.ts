import Vuex from 'vuex'
import RefreshToken from './modules/RefreshToken'
import UserData from './modules/UserData'

export default new Vuex.Store({
  modules: {
    RefreshToken,
    UserData
  }
})
