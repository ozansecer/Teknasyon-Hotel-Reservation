const state = {
  roomType: null,
  roomView: null
}

const getters = {
  getRoomType (state) {
    return state.roomType
  },
  getRoomView (state) {
    return state.roomView
  }
}

const mutations = {
  setRoomType (state, payload) {
    state.roomType = payload
  },
  setRoomView (state, payload) {
    state.roomView = payload
  }
}


export default {
  state,
  getters,
  mutations
}