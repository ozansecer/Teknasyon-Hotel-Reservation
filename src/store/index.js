import Vue from 'vue'
import Vuex from 'vuex'
import stepComponent from './modules/stepComponent'
import stepCheckIn from './modules/stepCheckIn'
import stepPayment from './modules/stepPayment'
import stepRoomDetails from './modules/stepRoomDetails'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stepComponent,
    stepCheckIn,
    stepPayment,
    stepRoomDetails
  }
})
