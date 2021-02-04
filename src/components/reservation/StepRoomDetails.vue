<template>
  <section>
    <v-row>
      <v-col class="text-center mx-auto" cols="12" sm="12">
        <h3 class="primary--text">Giriş Tarihi: <span class="font-weight-thin black--text">{{getCheckinDate}} </span>
          /
          Çıkış Tarihi: <span class="font-weight-thin black--text">{{getCheckoutDate}} </span>
          </h3> 
      </v-col>
      <v-col class="ma-auto roomType mb-11 mt-5" cols="12" sm="12" lg="6">
        <v-col class="mb-0 pb-0 bb" cols="12">
          <v-row>
            <v-col class="align-center" cols="12">
              <h3 class="primary--text">Oda Tipi:</h3>
            </v-col>

            <v-col cols="12">
              <v-radio-group
                class="mt-0"
                :row="true"
                v-model="roomType"
                :class="{
                  'errorContainer': buttonStatus && !this.$v.roomType.required
                  }"
              >
                <v-radio value="Standart" label="Standart"></v-radio>
                <v-radio value="Deluxe" label="Deluxe"></v-radio> 
                <v-radio value="Suit" label="Suit"></v-radio>
              </v-radio-group>
                <label v-if="buttonStatus && !this.$v.roomType.required" for="" class="error-message">Lütfen Oda Tipini Seçiniz</label>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mt-0 pt-0" cols="12">
          <v-row>
            <v-col class="align-center mt-5" cols="12">
            <h3 class="primary--text">Manzara Seçimi:</h3>
            </v-col>

            <v-col cols="12">
              <v-radio-group
                class="mt-0"
                :row="true"
                v-model="roomView"
                :class="{
                  'ma-0 errorContainer': buttonStatus && !this.$v.roomView.required
                  }"
              >
                <v-radio value="Deniz" label="Deniz"></v-radio>
                <v-radio value="Kara" label="Kara"></v-radio>
              </v-radio-group>
                <label v-if="buttonStatus && !this.$v.roomView.required" for="" class="error-message">Lütfen Manzara Tipini Seçiniz</label>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <app-button 
    class="float-left"
      @click.native="prevStep"
      :index="stepIndex-1"
    >
    Geri
    </app-button>
    <app-button
    @click.native="nextStep"
    :index="stepIndex"
    ></app-button>
  </section>
</template>
<script>

import button from '../buttons/button'
import { required } from 'vuelidate/lib/validators'

import { mapGetters } from 'vuex'

export default {
  name: "StepRoomDetails",
  components: {
    appButton: button
  },
  data () {
    return {
      roomType: null,
      roomView: null,
      stepIndex: null,
      buttonStatus: false
    }
  },
  validations: {
    roomType: {
      required
    },
    roomView: {
      required
    }
  },
  methods: {
    prevStep () {
      this.$store.commit("setActiveStep", 1)
    },
    nextStep () {
      this.buttonStatus = true
      if(this.stepIndex === null && !this.$v.$invalid){
        this.$store.commit("setCompletedStep", 3)
      }
      !this.$v.$invalid ? this.stepIndex = 3 : ""
    }
  },
  watch: {
    roomType () {
      this.$store.commit("setRoomType", this.roomType)
    },
    roomView () {
      this.$store.commit("setRoomView", this.roomView)
    },
    stepIndex () {
      this.$store.commit("setActiveStep", this.stepIndex)
    }
  },
  computed: {
    ...mapGetters([
      'getCheckinDate', 'getCheckoutDate'
    ])
  },
  created () {
    const roomDetailsStorage = JSON.parse(localStorage.getItem("reservationObj"))
    if(roomDetailsStorage != null){
      this.roomType = roomDetailsStorage.room.type
      this.roomView = roomDetailsStorage.room.view
    }    
  }
}
</script>
<style lang="less">
.errorContainer{
  .theme--light.v-icon{
    color:Red;
  }
}


.v-input--radio-group.v-input--radio-group--row .v-radio{
  @media screen and (max-width:450px){
      width:100%;
      margin:5px 0;
  } 
}
.v-input--selection-controls{
  @media screen and (max-width:1024px){
    margin:0 !important;
    padding:0 !important;
  } 
}

.roomType {
    box-shadow: 5px 10px 18px rgba(136, 136, 136, 1)!important;
    border-radius: 10px ;
}

.bb {
  border-bottom: 1px solid #cecece;
}

</style>