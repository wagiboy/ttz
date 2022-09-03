<template>
  <v-container>
    <v-row :class="marginTop"> 
      <v-col cols="12">
        <!-- Polygon Network -->
        <v-card class="mx-auto">
          <v-img src="@/assets/polygon.png" class="mx-auto" max-width="150"/> 

          <v-card-title class="blue-grey--text text--darken-2">
            The Polygon Network 
          </v-card-title>

          <v-card-text class="blue-grey--text">
            The smart contract holding the TTZ tokens runs on Polygon's Mumbai test network.<br>
            Polygon is a layer 2 protocol providing scalability to the Ethereum blockchain.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" v-for='card in cards' :key="card.title" :class="rightViewport ? card.pr : ''">
        <v-card>

          <!-- title row -->
          <v-row>
            <v-col cols="8">
              <v-card-title class="blue-grey--text text--darken-2">
                {{ card.title }}
              </v-card-title> 
            </v-col> 

            <v-col cols="4" class="mt-3">
              <v-icon x-large>{{ card.icon }}</v-icon>
            </v-col>
          </v-row>          

          <v-card-text class="blue-grey--text">
            {{ card.text }}
          </v-card-text>

          <v-card-actions>
            <v-btn         
              class="primary white--text text-capitalize"
              :href="card.href"
              target="_blank"
              block
            >
             {{ card.btntext }}
            </v-btn> 
          </v-card-actions>  

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import env from '@/env.js'
export default {
  props: {
    marginTop: {
      type: String,
      default: ""
    }
  },  
  data: () => ({
		cards: [{ 
        title: 'The TTZ Smart Contract', 
        icon: 'mdi-file-document-edit-outline',
        text: 'The smart contract holding the TTZ tokens can be seen on the polygonscan blockchain explorer.',
        href: 'https://mumbai.polygonscan.com/address/'+env.contractAddress,
        btntext: 'View Contract '+env.contractAddress.substring(0,5),
        pr: "pr-0"
      },{
        title: 'The Wallet', 
        icon: 'mdi-hexagon-multiple',
        text: "Wallet address that created the TTZ smart contact. View it on Polyscan—Polygon's blockchain explorer.",
        href: 'https://mumbai.polygonscan.com/address/'+env.walletAddress,
        btntext: 'View Wallet '+env.walletAddress.substring(0,5),
        pr: ""
      }
		]
	}),
  computed: {
    rightViewport() {
      return this.$vuetify.breakpoint.smAndUp
    } 
  }
}
</script>




