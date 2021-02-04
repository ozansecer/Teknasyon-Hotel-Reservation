const state = {
  activeStep: 0,
  completedStep: 0
}

const getters = {
  getActiveStep (state) {
    return state.activeStep
  },
  getCompletedStep (state) {
    return state.completedStep
  }
}

const mutations = {
  setActiveStep (state, payload) {
    state.activeStep = payload
  },
  setCompletedStep (state, payload) {
    state.completedStep = payload
  }
}

export default {
  state,
  getters,
  mutations
}