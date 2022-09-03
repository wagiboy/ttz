<template>
  <v-container class="d-flex pa-0" style="min-height: 450px">
    <v-sheet class="align-self-center mx-auto text-center ">
      <v-progress-circular
        :rotate="-90"
        :size="180"
        :width="10"
        :value="progressPercentage"
        color="primary"
        class="mx-auto"
      >
        {{ progressPercentage }}%
      </v-progress-circular>

      <v-spacer></v-spacer>

      <p class="subtitle=1">sending 10 TTX to your wallet</p>          
    </v-sheet>
  </v-container>
</template>

<script>
export default { 
  data: () => ({
    progressPercentage: 0,    
  }),
  mounted() {
    setInterval(() => {
      if (this.progressPercentage >= 100) {
        this.$emit('next-step')
        return
      }
      this.progressPercentage += 1
    }, 105)    
  },
  methods: {
    nextStep() {
      // console.log('In Spinner click next')
      this.$emit('next-step')
    }
  }    
}
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>