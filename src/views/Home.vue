<template>
  <div class="home">
    <v-stepper
    @change="changeStep"
    v-model="stepIndex"
    >
      <v-stepper-header>
        <v-stepper-step
        :editable="completedStep > 0"
        :complete="activeStep > 1"
        step="1"
        
        >
        Tarih Seçimi
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
        :editable="completedStep > 1"
        :complete="activeStep > 2"
        step="2"
        >
        Oda Seçimi
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
        :editable="completedStep > 2"
        :complete="activeStep > 3"
        step="3"
        >
        Ödeme
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
        :editable="completedStep > 4"
        :complete="activeStep > 4"
        step="4"
        >
        Sonuç
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <app-checkout></app-checkout>
        </v-stepper-content>
        <v-stepper-content step="2">
          <app-room></app-room>
        </v-stepper-content>
        <v-stepper-content step="3">
          <app-payment></app-payment>
        </v-stepper-content>
        <v-stepper-content step="4">
          <app-result></app-result>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>

import checkout from "../components/reservation/StepCheckIn"
import room from "../components/reservation/StepRoomDetails"
import payment from "../components/reservation/StepPayment"
import result from "../components/reservation/StepResult"


export default {
    name: "Home",
    components: {
      appCheckout: checkout,
      appRoom: room,
      appPayment: payment,
      appResult: result
    },
    data () {
      return {
        stepIndex: 1,
      }
    },
    computed: {
      activeStep () {
        return this.$store.getters.getActiveStep
      },
      completedStep () {
        return this.$store.getters.getCompletedStep
      }
    },
    watch: {
      activeStep () {
        this.stepIndex = this.activeStep
      },
      stepIndex () {
        this.$store.commit("setActiveStep", Number(this.stepIndex))
      }
    },
    methods: {
     changeStep ()  {
       this.$store.commit("setActiveStep", this.activeStep)
     }
    }
  }
</script>
<style lang="less">
.v-stepper__step__step .v-icon.v-icon{
  font-size: 12px !important;
}
</style>