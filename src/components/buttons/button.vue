<template>
  <div>
      <v-btn
        color="success"
        class="float-right"
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
      index ? this.$store.commit("setActiveStep", Number(index)) : "" 
    }
  }
}
</script>
