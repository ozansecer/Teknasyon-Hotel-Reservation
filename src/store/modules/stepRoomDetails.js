const state = {
  roomType: null,
  roomView: null
}

const mutations = {
  setRoomType (state, payload) {
    state.roomType = payload
  },
  setRoomView (state, payload) {
    state.roomView = payload
  }
}

const getters = {
  getRoomType (state) {
    return state.roomType
  },
  getRoomView (state) {
    return state.roomView
  }
}


export default {
  state,
  mutations,
  getters
}