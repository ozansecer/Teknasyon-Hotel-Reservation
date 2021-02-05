const state = {
  cardUserDetails: {
    name: "",
    number: null,
    date: null,
    cvc: null
  }
}

const mutations = {
  setCardDetails (state, payload) {
    return state.cardUserDetails = payload
  }
}

const getters = {
  getCardDetails (state) {
    return state.cardUserDetails
  }
}

export default {
  state,
  mutations,
  getters
}