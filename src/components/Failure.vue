<template>
  <v-container class="d-flex pa-0" style="min-height: 450px">
    <v-card class="align-self-center mx-auto text-center" flat>
      <v-icon class="blue-grey--text mx-auto" x-large>mdi-emoticon-dead-outline</v-icon>

      <v-card-text class="blue-grey--text text--darken-2 pa-3">
        <p class="subtitle-1">Transaction failure!</p>
        <v-sheet rounded="lg" class="grey lighten-4 blue-grey--text px-10 py-3">        
          {{ reason }}
        </v-sheet>
      </v-card-text>

      <v-spacer></v-spacer>

      <v-card-actions>
        <v-btn 
          class="primary white--text text-capitalize" 
          block 
          @click="close()"
        >
          Ok
        </v-btn> 
      </v-card-actions>  
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    reason: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('next-step')
    }
  }
}
</script>