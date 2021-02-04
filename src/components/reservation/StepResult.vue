<template>
  <section>
    <v-alert
      color="success"
      dark
      icon="fas fa-check-circle"
      text
    >
      Sayın {{getCardDetails && getCardDetails.name | toUpperCase}}, rezervasyonunuz başarıyla oluşturulmuştur. {{getCheckinDate}} tarihinde otelimize giriş yapabilirsiniz. Detaylar aşağıda yer almaktadır.
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
            <strong>{{getCheckinDate}} / {{getCheckoutDate}}</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="primary--text mb-2">Oda / Manzara Tipi</v-list-item-title>
          <v-list-item-subtitle>
            <strong>{{getRoomType}} / {{getRoomView}}</strong>
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
              :index="stepIndex-1"
          >
            Başa Dön
      </app-button>
  </section>
</template>
<script>

import button from '../buttons/button'

import { mapGetters } from 'vuex'

export default {
  name: "StepResult",
  components: {
    appButton: button
  },
  data() {
    return{
      stepIndex: null,
    }
  },
  methods: {
    prevStep () {
      this.$store.commit("setActiveStep", 1)
    },
  },
  computed: {
    ...mapGetters([
      'getCheckinDate', 'getCheckoutDate', 'getRoomType', 'getRoomView', 'getCardDetails', 'getActiveStep'
    ])
  },
  watch: {
    getActiveStep () {
      if(this.getActiveStep === 4){
        const resultObj = {
          date: {
            checkin: this.getCheckinDate,
            checkout: this.getCheckoutDate,
          },
          room: {
            type: this.getRoomType,
            view: this.getRoomView
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
