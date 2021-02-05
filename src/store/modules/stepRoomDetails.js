const state = {
  roomType: null,
  roomView: null
}

const mutations = {
  setSelectRoomType (state, payload) {
    state.roomType = payload
  },
  setSelectRoomView (state, payload) {
    state.roomView = payload
  }
}

const getters = {
  getSelectRoomType (state) {
    return state.roomType
  },
  getSelectRoomView (state) {
    return state.roomView
  }
}


export default {
  state,
  mutations,
  getters
}