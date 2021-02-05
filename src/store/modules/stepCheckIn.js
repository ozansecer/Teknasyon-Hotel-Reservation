const state = {
  date: new Date(),
  checkIn: null,
  checkOut: null
}

const mutations = {
  setSelectCheckInDate (state, payload) {
    state.checkIn = payload
  },
  setSelectCheckOutDate (state, payload) {
    state.checkOut = payload
  }
}

const getters = {
  getSelectCheckInDate (state) {
    return state.checkIn
  },
  getSelectCheckOutDate (state) {
    return state.checkOut
  },


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