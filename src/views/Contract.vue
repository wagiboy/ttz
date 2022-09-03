<template>
  <v-container>
    <!-- Token Info  -->
    <v-row :class="marginTop"> 
      <v-col cols="12">
        <v-card class="mx-auto">

          <v-card-text class="blue-grey--text title text-center">
            <v-icon x-large>mdi-hexagon-slice-2</v-icon>
            Token Info
          </v-card-text>

          <v-data-table
            :headers="headers"
            :items="tokenInfo"
            hide-default-footer
            class="elevation-0"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Blockchain Info  -->
    <v-row :class="marginTop"> 
      <v-col cols="12">
        <v-card class="mx-auto">

          <v-card-text class="blue-grey--text title text-center">
            <v-icon x-large>mdi-link-variant</v-icon>
            Blockchain Info 
          </v-card-text>

          <v-data-table
            :headers="headers"
            :items="blockchainInfo"
            hide-default-footer
            class="elevation-0"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import env        from '@/env.js'
import store      from '@/store.js'
import contract   from '@/web3/contract.js'
import blockchain from '@/web3/blockchain.js'
      
export default {
  props: {
    marginTop: {
      type: String,
      default: ""
    }
  }, 
  data: () => ({ 
    headers: [{
      text: 'Property Name',
      align: 'start',
      sortable: true,
      value: 'name',
    },{ 
      text: 'Property Value', 
      align: 'start',
      sortable: true,
      value: 'value' 
    }]
  }),
  computed: {
    /**
     * By making the arrays tokenInfos and blockchainInfo a computed property, 
     * their values become reactive. This is necessary to be notified about the 
     * mutation of the store.tokenName|tokenSymbol|etc values as they are fetched
     * asynchronously from the blockchain.
     **/ 
    tokenInfo() {
      return [{
        name: 'contract address',
        value: env.contractAddress
      },{
        name: 'Wallet address paying for faucet drip',
        value: env.walletAddress
      },{
        name: 'Token name',
        value: store.tokenName
      },{
        name: 'Token symbol',
        value: store.tokenSymbol
      },{
        name: 'Total supply in (wei) units',
        value: store.totalSupply
      },{
        name: 'Total supply in TTZ Token',
        value: store.totalSupplyFormatted
      }]
    },
    blockchainInfo() {
      return [{
        name: 'Blockchain name',
        value: 'Polygon PoS'
      },{
        name: 'Block number',
        value: store.blockNumber
      },{
        name: 'Gas price (in Gwei)',
        value: store.gasPriceInGwei
      },{
        name: "Gas left in wallet paying for faucet drip (MATIC)",
        value: store.balanceInMatic
      }]
    }
  },
  created() {
    // console.log('Contract::created()')

    // fetch blockchain related data
    blockchain.fetchBalance()
    blockchain.fetchGasPrice()
    blockchain.fetchBlockNumber()

    // fetch contract's data
    contract.fetchTokenName()
    contract.fetchTokenSymbol()
    contract.fetchTotalSupply()
    contract.fetchCirculatingSupply()
  }
}
</script>




