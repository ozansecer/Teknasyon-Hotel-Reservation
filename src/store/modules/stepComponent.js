const state = {
  activeStep: 0,
  completedStep: 0
}

const mutations = {
  setCurrentStep (state, payload) {
    state.activeStep = payload
  },
  setCompletedStep (state, payload) {
    state.completedStep = payload
  }
}

const getters = {
  getCurrentStep (state) {
    return state.activeStep
  },
  getCompletedStep (state) {
    return state.completedStep
  }
}

export default {
  state,
  mutations,
  getters
}