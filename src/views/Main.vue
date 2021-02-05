<template>
    <v-stepper
    @change="changeStep"
    v-model="stepCurrentIndex"
    >
    <v-row>
       <v-col sm="12" md="8" class="mx-auto pa-7"> 
        <v-stepper-header class="section-bg">
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
      </v-col>
    </v-row>
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
        stepCurrentIndex: 1,
      }
    },
    computed: {
      activeStep () {
        return this.$store.getters.getCurrentStep
      },
      completedStep () {
        return this.$store.getters.getCompletedStep
      }
    },
    watch: {
      activeStep () {
        this.stepCurrentIndex = this.activeStep
      },
      stepCurrentIndex () {
        this.$store.commit("setCurrentStep", Number(this.stepCurrentIndex))
      }
    },
    methods: {
     changeStep ()  {
       this.$store.commit("setCurrentStep", this.activeStep)
     }
    }
  }
</script>
<style lang="less">
.v-stepper__step__step .v-icon.v-icon{
  font-size: 12px !important;
}
</style>