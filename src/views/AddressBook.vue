<template>
  <div :class="marginTop"> 
    <v-card width="800" class="mx-auto"> 
      <v-card-text class="blue-grey--text title text-center">
        <v-icon x-large>mdi-currency-krw</v-icon>
        Wallet addresses holding TTZ coin
      </v-card-text>
      <v-data-table
        :headers="headers"
        :items="balances"
        :items-per-page="10"
        class="elevation-0"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import store    from '@/store.js'
import web3     from '@/web3/web3.js'
import contract from '@/web3/contract.js'

export default {
  props: {
    marginTop: {
      type: String,
      default: "mt-3"
    }
  }, 
  data: () => ({ 
    headers: [{
      text: 'Address',
      align: 'start',
      sortable: true,
      value: 'name',
    },{ 
      text: 'Amount held (in TTZ)', 
      align: 'center',
      sortable: true,
      value: 'amount' 
    }]
  }),
  created() {
    contract.fetchBalances()
  },
  computed: {
    balances() {
      // balances may not yet been retrieved from the contract
      if(store.addressesWithBalance == null) return;

      var balances = Array();
      
      for(let i=0; i < store.addressesWithBalance.length; i++) {
        balances.push({
          name:   store.addressesWithBalance[i],
          amount: web3.balanceInTTZ(store.balances[i])
        })
      }

      return balances;
    }
  }
}
</script>