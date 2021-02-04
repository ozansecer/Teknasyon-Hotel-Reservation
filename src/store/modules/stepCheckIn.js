const state = {
  date: new Date(),
  checkinDate: null,
  checkoutDate: null
}

const mutations = {
  setCheckinDate (state, payload) {
    state.checkinDate = payload
  },
  setCheckoutDate (state, payload) {
    state.checkoutDate = payload
  }
}

const getters = {
  getCheckinDate (state) {
    return state.checkinDate
  },
  getCheckoutDate (state) {
    return state.checkoutDate
  },

  // set day
  setDateBuilder (state) {
    let _date = state.date
    _date.setDate(_date.getDate() + 1)
    let month = '' + (_date.getMonth() + 1)
    let day = '' + _date.getDate()
    let year = _date.getFullYear()

    if (month.length < 2) { month = '0' + month }
    if (day.length < 2) { day = '0' + day }
    return [year, month, day].join('-')
  },
}

export default {
  state,
  mutations,
  getters
}