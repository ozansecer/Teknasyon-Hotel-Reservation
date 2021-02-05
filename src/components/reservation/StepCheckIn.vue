<template>
  <section>
    <v-row>
      <v-col class="mx-auto roomType mt-6 mb-11 pa-8" cols="12" sm="12" md="6" >
        <v-row>
          <v-col class="align-center" cols="12" sm="12" md="12">
            <h3 class="primary--text">Giriş Tarihi</h3>
          </v-col>
          <v-col
            cols="12" sm="12" md="12"
            :class="{
              'errorContainer': isButtonSituation && this.$v.selectCheckInDate.$invalid,
              'successContainer': !this.$v.selectCheckInDate.$invalid,
            }"
          >
            <v-menu
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="selectCheckInDate"
                  label="Giriş Tarihini Seçiniz"
                  prepend-icon="fas fa-calendar-week"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                ></v-text-field>
              </template>

              <v-date-picker
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
              v-model="selectCheckInDate"
              :min="setDateBuilder"
              locale="tr"
              @change="changeCheckInDate"
              ></v-date-picker>
            </v-menu>
              <label v-if="isButtonSituation && this.$v.selectCheckInDate.$invalid" class="error-message">Lütfen Giriş Tarihini Seçiniz</label>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col class="align-center" cols="12">
            <h3 class="primary--text">Çıkış Tarihi</h3>
          </v-col>
          <v-col 
            cols="12"
            :class="{
              'errorContainer': isButtonSituation && this.$v.selectCheckOutDate.$invalid,
              'successContainer': !this.$v.selectCheckOutDate.$invalid,
            }"
          >
            
              <v-menu
                transition="scale-transition"
                offset-y
              >

                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="selectCheckOutDate"
                    label="Çıkış Tarihini Seçiniz"
                    prepend-icon="fas fa-calendar-week"
                    v-bind="attrs"
                    v-on="on"
                    readonly
                    :disabled="!selectCheckInDate"
                  ></v-text-field>
                </template>

                <v-date-picker
                v-model="selectCheckOutDate"
                :min="selectCheckInDate"
                locale="tr"
                ></v-date-picker>

              </v-menu>
              <label v-if="isButtonSituation && this.$v.selectCheckOutDate.$invalid" class="error-message">Lütfen Çıkış Tarihini Seçiniz</label>

          </v-col>
          
        </v-row>
      </v-col>
    </v-row>
    <Button @click.native="nextCurrentStep" :index="stepCurrentIndex" />
  </section>
</template>
<script>

import Button from '../buttons/Button'
import { required } from 'vuelidate/lib/validators'

import { mapGetters } from 'vuex'

export default {
  name: "StepCheckIn",
  components: {
    Button
  },
  data () {
    return {
      selectCheckInDate: null,
      selectCheckOutDate: null,
      stepCurrentIndex: null,
      isButtonSituation: false,
      count: 0
    }
  },
  methods: {
    nextCurrentStep () {
      this.isButtonSituation = true
      if(this.stepCurrentIndex === null && !this.$v.$invalid){
        this.$store.commit("setCompletedStep", 2)
      }
      !this.$v.$invalid ? this.stepCurrentIndex = 2 : ""
    },
    changeCheckInDate () {
      this.selectCheckOutDate = this.selectCheckInDate
    }
  },
  watch: {
    selectCheckInDate () {
      this.$store.commit("setSelectCheckInDate", this.selectCheckInDate)
    },
    selectCheckOutDate () {
      this.$store.commit("setSelectCheckOutDate", this.selectCheckOutDate)
    },
    stepCurrentIndex () {
      this.$store.commit("setCurrentStep", this.stepCurrentIndex)
    }
  },
  validations: {
    selectCheckInDate: {
      required
    },
    selectCheckOutDate: {
      required
    }
  },
  computed: {
    ...mapGetters([
      'setDateBuilder' 
    ])
  },
  created () {
    const checkInStorage = JSON.parse(localStorage.getItem("reservationObj"))
    if(checkInStorage != null){
      this.selectCheckInDate = checkInStorage.date.checkin
      this.selectCheckOutDate = checkInStorage.date.checkout
    }    
  }
}
</script>


<style lang="less">
  .align-center{
    display: flex;
  }
 
  @c-error: #FF5252;
  @c-success: #81C784;
  .error-message{
    color:@c-error;
    font-size: 12px;
    margin:0;
    padding:0;
    position: relative; 
    top:-15px;
    font-weight: bold;
  }
     
.v-stepper {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)!important;

  .v-stepper__content {
    padding: 0!important;
  }
}


.v-application{

    .v-application--wrap {
        background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);

        .v-stepper__wrapper {
          padding: 28px;
        }

      }
    
    .errorContainer{
      .v-label{
        color:@c-error !important;
        caret-color:@c-error !important;
      }
      .v-text-field > .v-input__control > .v-input__slot::before{
        border-color:@c-error !important;
      }
      input{
        color:@c-error !important;
      }
    }
    .successContainer{
      .v-label{
        color:@c-success !important;
        caret-color:@c-success !important;
      }
      .v-text-field > .v-input__control > .v-input__slot::before{
        border-color:@c-success !important;
      }
    }
  }

.v-menu__content {
        min-width: 0!important
      }

</style>