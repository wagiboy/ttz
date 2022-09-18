<template>
  <v-container>

    <!-- intro -->
    <v-row>
      <v-col cols="12" sm="6" align-self="end">
        <p class="display-2 blue-grey--text text--darken-2">
          Earn <TTZ/> coins when learning or tutoring
        </p>
        <p class="blue-grey--text text--darken-2">
          Parents and students earn TutorZ coin (<TTZ/>) when they purchase tutoring on the <a href="https://tutorz.com" target="_blank">TutorZ.com</a> platform.
          Tutors are being rewarded with <TTZ/> when teaching students. Thereafter, use <TTZ/> coins to get free tutoring.
        </p>       
      </v-col>
      <v-col cols="12" sm="6">
        <v-img 
          src="@/assets/colorful-students-2.jpg"
          alt="happy 5 stundents"
					transition="scale-transition"
					contain
					height="450"        
        />
      </v-col>
    </v-row>

    <!-- circulating supply -->
    <v-row class="mt-15 pt-15">
      <v-col cols="6" class="text-right mt-3 blue-grey--text text--darken-2">
        Circulating Supply:    
        <v-tooltip top>
          <template v-slot:activator="{ on }">                  
            <v-icon v-on="on" small>mdi-help-circle-outline</v-icon>
          </template>  
          <span>The amount of coins that are circulating in the market and are in public hands.</span>    
        </v-tooltip>            
      </v-col>
      <v-col cols="6" class="blue-grey--text text--darken-2">
        <h1>{{ circulatingSupply }} <TTZ/></h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" sm="6" md="5" lg="4" xl="3" class="pt-0 pl-10 mx-auto">
        <v-progress-linear
          height="20"
          striped
          v-model="circulatingSupplyAsPercentage">
          &#60; &nbsp;<strong>{{ circulatingSupplyAsPercentage }}%</strong>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="text-right blue-grey--text text--darken-2">
        out of Total Supply: 
        <v-tooltip top>
          <template v-slot:activator="{ on }">          
            <v-icon v-on="on" small>mdi-help-circle-outline</v-icon>
          </template>  
          <span>The amount of coins that have been already created.</span>    
        </v-tooltip>          
      </v-col>
      <v-col cols="6">
        {{ totalSupply }} <TTZ/>  (one million)
      </v-col>
    </v-row>

    <Faucet marginTop="mt-15 pt-13" />  
    <Contract marginTop="mt-15 pt-13"/>
    <AddressBook marginTop="mt-15 pt-15"/>
    <PolygonScan marginTop="mt-15 pt-15"/>
  </v-container>
</template>

<script>
import TTZ          from '@/components/TTZ.vue'
import Faucet       from '@/views/Faucet.vue'
import Contract     from '@/views/Contract.vue'
import AddressBook  from '@/views/AddressBook.vue'
import PolygonScan  from '@/views/PolygonScan.vue'
import store        from '@/store.js'
import contract     from '@/web3/contract.js'

export default {
  components: { TTZ, Faucet, Contract, AddressBook, PolygonScan },  
  created() {
    contract.fetchTotalSupply()
    contract.fetchCirculatingSupply()
  },
  computed: {
    totalSupply() {
      return store.totalSupplyFormatted
    },
    circulatingSupply() {  
      return store.circulatingSupplyFormatted
    },
    circulatingSupplyAsPercentage() {
      return store.circulatingSupplyAsPercentage
    }    
  }
}
</script>
