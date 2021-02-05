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

    <v-row>
      <v-col cols="12" sm="12" lg="4" md="4">
        <v-card
          class="mx-auto section-bg pa-6"
          max-width="100%"
          tile
        >

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline primary--text mb-3">
                Giriş / Çıkış Tarihleri
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>{{getSelectCheckInDate}} / {{getSelectCheckOutDate}}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" lg="4" md="4">
        <v-card
          class="mx-auto section-bg pa-6"
          max-width="100%"
          tile
        >

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline primary--text mb-3">
                Oda / Manzara Tipi
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>{{getSelectRoomType}} / {{getSelectRoomView}}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" lg="4" md="4">
        <v-card
          class="mx-auto section-bg pa-6"
          max-width="100%"
          tile
        >

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline primary--text mb-3">
                Ödeme Detayı
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>{{getCardDetails && getCardDetails.name | toUpperCase}}</strong><br>
                <strong>Kart Numarası: {{ getCardDetails.number }}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    
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
  .v-card {
    min-height: 150px;
  }

</style>
