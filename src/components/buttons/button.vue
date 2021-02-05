<template>
  <div>
      <v-btn
        color="#00ACC1"
        class="float-right white--text"
        @click="setStep(index)"
      >
      <slot>
        İLERİ
      </slot>
      </v-btn>
  </div>
</template>
<script> 
export default {
  props: {
    index: {
      required: true
    }
  },
  methods: {
    setStep (index) {
      index ? this.$store.commit("setCurrentStep", Number(index)) : "" 
    }
  }
}
</script>
