/* ------------------------------------------------------------------------
 * This file allows you to interact with the features and properties
 * of the blockchain the web3 endpoint is pointing to. 
 * Currently, this the Polygon blockchain.
 * ------------------------------------------------------------------------ */
import store from '@/store'
import env   from '@/env'
import web3  from '@/web3/web3.js'


class BlockChain {
  /* Provides getter methods to fetch data from the polygon blockchain. 
   * ------------------------------------------------------------------*/

  async fetchBalance() {
   /* ----------------------------------------------------------------------
    * Fetches the balance in Ether/Matic held by the wallet that created the contract
    * ----------------------------------------------------------------------- */  
    try {
      const balanceInWei   = await web3.web3lib.eth.getBalance(env.walletAddress)
      const balanceInEther = web3.web3lib.utils.fromWei(balanceInWei, 'ether')
      // console.log('balanceInMatic='+balanceInEther)
      store.balanceInMatic = balanceInEther
    }
    catch (error) {
      console.log("Caught exception in BlockChain::fetchBalance() " + error)
    }    
  }

  async logAccounts() {
   /* -------------------------------------------------------------------
    * logs all accounts to console of the node pointed to by the endpoint 
    * ------------------------------------------------------------------- */  
    try {
      web3.web3lib.eth.getAccounts().then(console.log)
    }
    catch (error) {
      console.log("Caught exception in BlockChain::fetchAccounts() " + error)
    }    
  }

  async fetchGasPrice() {
   /* -------------------------------------------------------------------
    * Logs the current gas price as determined by the last few blocks
    * median gas price.
    * ------------------------------------------------------------------- */  
    try {
      const gasPriceInWei = await web3.web3lib.eth.getGasPrice()
      const gasPriceInGwei = web3.web3lib.utils.fromWei(gasPriceInWei, 'gwei')
      //  console.log('gasPriceInGwei='+gasPriceInGwei)
      store.gasPriceInGwei = gasPriceInGwei
    }
    catch (error) {
      console.log("Caught exception in BlockChain::fetchGasPrice() " + error)
    }    
  }

  async fetchBlockNumber() {
   /* -------------------------------------------------------------------
    * Logs the current block number to console
    * ------------------------------------------------------------------- */  
    try {
      const blockNumber = await web3.web3lib.eth.getBlockNumber()
      //  console.log('blockNumber='+blockNumber)
      store.blockNumber = blockNumber
    }
    catch (error) {
      console.log("Caught exception in Blockhain::fetchBlockNumber() " + error)
    }    
  }     
}

export default new BlockChain()
