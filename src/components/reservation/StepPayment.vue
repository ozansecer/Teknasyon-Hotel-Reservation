<template>
  <section>
    <v-row>
      <v-col class="text-center" cols="12" md="12">
        <h3 class="primary--text">Giriş Tarihi: <span class="font-weight-thin black--text">{{getSelectCheckInDate}} </span>
          /
          Çıkış Tarihi: <span class="font-weight-thin black--text">{{getSelectCheckOutDate}} </span>
          </h3> 
      </v-col>
      <v-col class="text-center" cols="12" md="12">
        <h3 class="primary--text">Oda Tipi: <span class="font-weight-thin black--text">{{getSelectRoomType}} / {{getSelectRoomView}}</span></h3>
      </v-col>
      <v-col class="mx-auto roomType pa-10 mb-11" cols="12" md="6">
        <div :class="`mx-auto card mb-6 ${cardBack}`">

          <span class="card-number">
            {{!cardNumber ? placeNumber : cardNumber }}
          </span>
          <span class="card-name">
            {{!cardName && !cardName ? placeName : cardName | toUpperCase}}
          </span>
          <span class="card-date">
            {{!cardDate ? placeDate : cardDate }}
          </span>
          <span class="card-cvc">
            {{!cardCVC ? placeCVC : cardCVC }}
          </span>
          
          <span class="card-logo"></span>
          <span class="card-bg">
          </span>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :maxlength="30"
              v-model="cardName"
              label="Kart Üzerindeki İsim ve Soyisim"
              @focus="focusInput('cardName')"
              @blur="blurInput('cardName')"
              :class="{
                'errorContainer': (isButtonSituation && !this.$v.cardName.required) || (isButtonSituation &&  !this.$v.cardName.minLength),
                'successContainer': !this.$v.cardName.$invalid,
                }"
            ></v-text-field>
            <label v-if="isButtonSituation && !this.$v.cardName.required" for="" class="error-message">Lütfen isim ve soyisim giriniz</label>
            <label v-if="isButtonSituation &&  !this.$v.cardName.minLength" for="" class="error-message">Lütfen minimum 3 karakter giriniz</label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-model="cardNumber"
              v-mask="'#### #### #### ####'"
              label="Kart Numarası"
              @focus="focusInput('cardNumber')"
              @blur="blurInput('cardNumber')"
              :class="{
                'errorContainer': (isButtonSituation && !this.$v.cardNumber.required) || (isButtonSituation &&  !this.$v.cardNumber.minLength),
                'successContainer': !this.$v.cardNumber.$invalid,
                }"
            >
            </v-text-field>
            <label v-if="isButtonSituation && !this.$v.cardNumber.required" for="" class="error-message">Lütfen kart numaranızı giriniz</label>
            <label v-if="isButtonSituation &&  !this.$v.cardNumber.minLength" for="" class="error-message">Lütfen kart numaranızın tamamını giriniz</label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-mask="'##/##'"
              v-model="cardDate"
              label="Son Kullanma Tarihi"
              @focus="focusInput('cardDate')"
              @blur="blurInput('cardDate')"
              :class="{
                'errorContainer': (isButtonSituation && !this.$v.cardDate.required) || (isButtonSituation &&  !this.$v.cardDate.minLength),
                'successContainer': !this.$v.cardDate.$invalid,
                }"
            ></v-text-field>
            <label v-if="isButtonSituation && !this.$v.cardDate.required" for="" class="error-message">Lütfen kartınızın son kullanma tarihini giriniz</label>
            <label v-if="isButtonSituation &&  !this.$v.cardDate.minLength" for="" class="error-message">Lütfen kartınızın son kullanma tarihinin tamamını giriniz</label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="tel"
              v-mask="'###'"
              v-model="cardCVC"
              label="Güvenlik Numarası (CVC)"
              @focus="focusInput('cardCVC')"
              @blur="blurInput('cardCVC')"
              :class="{
                'errorContainer': (isButtonSituation && !this.$v.cardCVC.required) || (isButtonSituation &&  !this.$v.cardCVC.minLength),
                'successContainer': !this.$v.cardCVC.$invalid,
                }"
            ></v-text-field>
            <label v-if="isButtonSituation && !this.$v.cardCVC.required" for="" class="error-message">Lütfen kartınızın güvenlik numarasını giriniz</label>
            <label v-if="isButtonSituation &&  !this.$v.cardCVC.minLength" for="" class="error-message">Lütfen kartınızın güvenlik numarasının tamamını giriniz</label>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <app-button 
    class="float-left"
      @click.native="prevStep"
      :index="stepCurrentIndex-1"
    >
    GERİ
    </app-button>
    <app-button 
      @click.native="nextCurrentStep"
      :index="stepCurrentIndex"
    >
    ÖDEME
    </app-button>
  </section>
</template>
<script>

import Button from '../buttons/button'
import { required, minLength  } from 'vuelidate/lib/validators'

import { mapGetters } from 'vuex'

export default {
  name: "StepPayment",
  components: {
    appButton: Button
  },
  data () {
    return {
      cardBack: false,
      cardNumber: null,
      cardName: null,
      cardDate: null,
      cardCVC: null,

      placeNumber: 'KART NO',
      placeName: 'AD SOYAD',
      placeDate: '00/00',
      placeCVC: '000',
      
      stepCurrentIndex: null,
      isButtonSituation: false
    }
  },
  methods: {
    prevStep () {
      this.$store.commit("setCurrentStep", 2)
    },
    nextCurrentStep () {
      this.isButtonSituation = true
      if(this.stepCurrentIndex === null && !this.$v.$invalid){
        this.$store.commit("setCompletedStep", 4)
      }
      !this.$v.$invalid ? this.stepCurrentIndex = 4 : ""

      const cardUserDetails = {
        name: this.cardName,
        number: this.cardNumber,
        date: this.cardDate,
        cvc: this.cardCVC
      }
      this.$store.commit("setCardDetails", cardUserDetails)
    },
    focusInput (type) {
      if (type === "cardCVC") {
        this.cardBack = true
      }
    },
    blurInput (type) {
      if (type === "cardCVC") {
        this.cardBack = false
      }
    }
  },
  watch: {
    stepCurrentIndex () {
      this.$store.commit("setCurrentStep", this.stepCurrentIndex)
    }
  },
  validations: {
    cardNumber: {
      required,
      minLength: minLength(19)
    },
    cardName: {
      required,
      minLength: minLength(6)
    },
    cardDate: {
      required,
      minLength: minLength(5)
    },
    cardCVC: {
      required,
      minLength: minLength(3)
    }
  },
  computed: {
    ...mapGetters([
      'getSelectCheckInDate', 'getSelectCheckOutDate', 'getSelectRoomType', 'getSelectRoomView'
    ])
  },
  created () {
    const paymentStorage = JSON.parse(localStorage.getItem("reservationObj"))
    if(paymentStorage != null){
      this.cardName = paymentStorage.card.name
      this.cardNumber = paymentStorage.card.number
      this.cardDate = paymentStorage.card.date
      this.cardCVC = paymentStorage.card.cvc
    }    
  }
}
</script>
<style lang="less">

  .card{
    width: 500px;
    height: 250px;
    border-radius: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    transition:0.5s;

      @media screen and (max-width:767px){
          width:100%;
          height:280px
      }
      @media screen and (max-width:450px){
        width:100%;
        height:200px;
      }

    .card-cvc{
      opacity: 0;
      z-index: 2;
      width: 100%;
      text-align: left;
      background:#6D6D6A;
      color:#fff;
      padding:10px;
      margin:0 0 20px 0;
      position: absolute;
      font-size: 25px;
      transform:rotateY(180deg);
      text-align: right;
    }
  
  > * {
    transition: 0.5s;
  }

  }
  .true{
    transform:rotateY(180deg);
    .card-number,
    .card-name,
    .card-date{
      opacity: 0;
    }
    .card-logo{
      transform:rotateY(180deg);
    }
    .card-cvc{
      opacity: 1;
      display: inline-block;
      position: static;
    }
  }

  .card-number{
    z-index: 2;
    width:100%;
    text-align: center;
    font-size: 38px;
    color:#babfce;
    text-shadow: 1px 1px 1px #fff;
    margin:40px 0 0 0;
    background-color:#ececec;
    border: solid 1px #06b4e4;
    border-left: 0;
    border-right: 0;
    @media screen and (max-width:450px){
        font-size: 20px;
    }
  }
  .card-name,
  .card-date{
    z-index: 2;
    padding:0 20px 20px 20px;
    color:#fff;
    font-weight: bold;
    font-size: 20px;
    @media screen and (max-width:450px){
        font-size: 12px;
    }
  }
  .card-bg,
  .card-logo{
    position: absolute;
    width:100%;
    height: 100%;
    border-radius: 10px;
    background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF); 
    background: linear-gradient(to top, #4481eb 0%, #04befe 100%);
    box-shadow: 5px 5px 5px #888884;
  }
  .card-logo{
    background-image:url('../../assets/master-card.png');
    background-repeat: no-repeat;
    background-position: top 15px left 20px;
    z-index: 2;
    background-size: 20%;
  }

</style>