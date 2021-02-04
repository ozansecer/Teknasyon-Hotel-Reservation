const state = {
  cardDetail: {
    name: "",
    number: null,
    date: null,
    cvc: null
  }
}

const mutations = {
  setCard (state, payload) {
    return state.cardDetail = payload
  }
}

const getters = {
  getCardDetails (state) {
    return state.cardDetail
  }
}

export default {
  state,
  mutations,
  getters
}