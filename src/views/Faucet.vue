<template>
  <div :class="marginTop"> 
    <div class="spacer hidden-sm-and-down"></div>
    <div class="spacer hidden-md-and-down"></div>
    <div class="spacer hidden-lg-and-down"></div>           
    <v-card width="500" class="mx-auto">
      <v-img
        width="200"
        src="@/assets/faucet.gif"        
        class="mx-auto"
      />           
      <v-card-title class="primary--text display-1 ">                       
        Faucet
      </v-card-title> 

      <v-card-text class="blue-grey--text">
        Use this TTZ faucet to drip <strong>10</strong> <TTZ/> coins into your MetaMask wallet.  
        
        <v-form class="mt-10">            
          <v-text-field
            outlined
            label="Wallet Address"
            prepend-inner-icon="mdi-wallet"            
            v-model="address" 
            @blur="validateAddress()"
            @focus="resetError()"
            :rules="[rules]"
            :error-messages="errMsg"
            :append-icon="appendIcon"                              
          ></v-text-field>

          <!-- drip button and popup -->
          <v-dialog v-model="bDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn
                large
                block
                class="primary text-capitalize" 
                v-on="on" 
                @click="popupWizard()"
                :disabled="bDisabled"    
              >Drip 10 TTZ</v-btn>
            </template>

            <!-- the popup is a wizard by design -->
            <transition name="fade" mode="out-in">   
              <v-card width="500" :key="step" class="pa-2 mx-auto">
                <v-card-text class="pt-0">                   
                  <Review  @next-step="nextStep" :address="address"      v-if="step ===  1" />
                  <Spinner @next-step="nextStep"                    v-else-if="step ===  2" />
                  <Success @next-step="nextStep" :address="address" v-else-if="step ===  3" />
                  <Failure @next-step="nextStep" :reason="reason"   v-else-if="step === -1" />                 
                </v-card-text>        
              </v-card> 
            </transition>                        
          </v-dialog>
        </v-form>
      </v-card-text>                              
    </v-card>
  </div>      
</template>

<script>
import TTZ      from '@/components/TTZ.vue'
import Review   from '@/components/Review.vue'
import Spinner  from '@/components/Spinner.vue'
import Success  from '@/components/Success.vue'
import Failure  from '@/components/Failure.vue'
import contract from '@/web3/contract.js'
import eventBus from '@/eventBus.js'

export default {
  props: {
    marginTop: {
      type: String,
      default: "mt-3"
    }
  },  
  components: { TTZ, Review, Spinner, Success, Failure },   
  data: () => ({    
    bDisabled: true,
    bDialog: false,   
    step: 1,
    address: '', // e.g. 0xe83Bc36AB088eE9DEBf0EdC358836013D1cfa18c
    errMsg: '',
    contractErrMsg: '',
    appendIcon: ''
  }),
  created() {    
	  eventBus.$on("drip-success", (msg, txHash) => {
      // console.log("Faucet() eventBus.on('drip-success')")
      this.step = 3
    }),
    eventBus.$on("drip-failure", (msg) => {
      // console.log("Faucet() eventBus.on('drip-failure') msg="+msg)
      this.contractErrMsg = msg
      this.step = -1
    })
  },     
  computed: {
    reason() {
      return this.contractErrMsg
    }
  },
  methods: {
    popupWizard() {
      // console.log("Faucet::drip()") 
      this.bDialog = true;
    },
    nextStep() {
      this.step++;
      // console.log("nextStep() step: "+this.step) 
      if (this.step == 0) {
        this.closeDialog()
        this.reset()
      }
      if (this.step == 2) {
        this.drip()
      }
      if (this.step >= 4) {
        this.closeDialog()
        this.reset()
      }
    },
    drip() {
      contract.listenToEvents()
      contract.drip(this.address)
    },
    closeDialog() {
      this.bDialog = false
      this.bDisabled = true
    },
    reset() {
      this.step = 1
      this.address = ''
    },
    rules(value) {
      // console.log('rules() address length='+value.length)
      if (value.length == 0) {
        return true
      }
      if (value.length < 40) { // length of an etherum address is 40 bytes prepended by 0x
        this.setError()
        return "Your ethereum address is too short. Must be 40 or 42 chars"  
      } 
      if (value.length > 42) {      
        this.setError()
        return "Your ethereum address is too long.  Must be 40 or 42 chars" 
      } 
      this.resetError()
      this.bDisabled = false
      return true 
    },
    validateAddress() {
      if (this.address.length == 0 ) {
        this.appendIcon = 'mdi-exclamation'
        this.errMsg = "Please enter your wallet address."
        this.bDisabled = true
      }
      else if (this.address.length >= 40 && this.address.length <= 42) {
        this.appendIcon = 'mdi-check'
        this.errMsg = ''
        this.bDisabled = false
      } 
      else {
        this.appendIcon = 'mdi-exclamation'
        this.errMsg = "Invalid ethereum address. "
        this.bDisabled = true
      }
    },
    setError() {
      this.appendIcon = 'mdi-exclamation'
      this.bDisabled = true
    },
    resetError() {
      this.errMsg = ''
      this.appendIcon = ''
    }        
  }  
}
</script>

<style>
.spacer {
  height: 1em;
}
/* --- transitions --- */
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 50;
}
</style>
        