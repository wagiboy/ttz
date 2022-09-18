<template>
  <v-container class="d-flex pa-0" style="min-height: 450px">
    <v-card class="align-self-center" flat>
      <v-card-title class="blue-grey--text text--darken-2">
        Review the following transaction details
      </v-card-title>

      <v-card-text>
        <v-sheet rounded="lg" class="grey lighten-4 blue-grey--text pa-3">
          <v-row>
            <v-col cols="4">
              Token
            </v-col>
            <v-col cols="8" class="font-weight-bold">
              TTZ
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              Amount
            </v-col>
            <v-col cols="8" class="font-weight-bold">
              10
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              Transfer to address
            </v-col>
            <v-col cols="8" class="font-weight-bold">
              {{ address }}
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-text>

      <v-card-actions>
        <v-btn class="primary white--text" block @click="ok()">Ok</v-btn> 
      </v-card-actions>  

    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    address: ''
  },
  methods: {
    ok() {
      // console.log('in component Review clicked ok()')
      this.$emit('next-step')
    }
  }
}
</script>