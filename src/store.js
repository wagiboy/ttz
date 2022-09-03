import Vue from 'vue'

/* Vue.observable transforms an object into a reactive entity.
 * It's a store for VUE apps, similar to VUEX or Pinia */
const store = Vue.observable({ 
  
  // blockchain data
  balanceInMatic: null,
  gasPriceInGwei: null,
  blockNumber: null,
  
  // contract 
  tokenName: 'TutorZ Token',
  tokenSymbol: 'TTZ',
  totalSupply: 1000000000000000000000000,
  totalSupplyFormatted: '1,000,000',
  circulatingSupplyInFullUnits: '40040',
  circulatingSupplyFormatted: '40,040',
  circulatingSupplyAsPercentage: '5',
  addressesWithBalance: null,
  balances: null
})

export default store;