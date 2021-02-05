<template>
  <section>
    <v-alert
      color="success"
      dark
      icon="fas fa-check-circle"
      text
    >
      Sayın {{getCardDetails && getCardDetails.name | toUpperCase}}, rezervasyonunuz başarıyla oluşturulmuştur. {{getSelectCheckInDate}} tarihinde otelimize giriş yapabilirsiniz. Detaylar aşağıda yer almaktadır.
    </v-alert>
    <v-card
      class="mx-auto roomType pa-6"
      max-width="100%"
      tile
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="primary--text mb-2">Giriş / Çıkış Tarihleri</v-list-item-title>
          <v-list-item-subtitle>
            <strong>{{getSelectCheckInDate}} / {{getSelectCheckOutDate}}</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="primary--text mb-2">Oda / Manzara Tipi</v-list-item-title>
          <v-list-item-subtitle>
            <strong>{{getSelectRoomType}} / {{getSelectRoomView}}</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line> 
        <v-list-item-content> 
          <v-list-item-title class="primary--text mb-2">Ödeme Detayı</v-list-item-title>
          <v-list-item-subtitle>
            <strong>{{getCardDetails && getCardDetails.name | toUpperCase}}</strong>
            <br>
            <strong>Kart Numarası: {{ getCardDetails.number }}</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <app-button 
            class="float-right mt-8"
              @click.native="prevStep"
              :index="stepCurrentIndex-1"
          >
            BAŞA DÖN
      </app-button>
  </section>
</template>
<script>

import Button from '../buttons/button'

import { mapGetters } from 'vuex'

export default {
  name: "StepResult",
  components: {
    appButton: Button
  },
  data() {
    return{
      stepCurrentIndex: null,
    }
  },
  methods: {
    prevStep () {
      this.$store.commit("setCurrentStep", 1)
    },
  },
  computed: {
    ...mapGetters([
      'getSelectCheckInDate', 'getSelectCheckOutDate', 'getSelectRoomType', 'getSelectRoomView', 'getCardDetails', 'getCurrentStep'
    ])
  },
  watch: {
    getCurrentStep () {
      if(this.getCurrentStep === 4){
        const resultObj = {
          date: {
            checkin: this.getSelectCheckInDate,
            checkout: this.getSelectCheckOutDate,
          },
          room: {
            type: this.getSelectRoomType,
            view: this.getSelectRoomView
          },
          card: this.getCardDetails
        }
        localStorage.setItem("reservationObj", JSON.stringify(resultObj));


        console.log(
          `
          Giriş Tarihi: ${resultObj.date.checkin} \n
          Çıkış Tarihi: ${resultObj.date.checkout} \n
          Oda Tipi: ${resultObj.room.type} \n
          Oda Manzarası: ${resultObj.room.view} \n
          Kart Üzerideki İsim: ${resultObj.card.name} \n
          Kart Numarası: ${resultObj.card.number} \n
          Kart Son Kullanma Tarihi: ${resultObj.card.date} \n
          Kart Güvenlik Numarası: ${resultObj.card.cvc} \n
          `
        )

      }
    }
  },
}
</script>

<style lang="less">
  .v-list-item__content {
    border-bottom: 1px dashed #cecece;
    margin-bottom: 15px;
  }

</style>
