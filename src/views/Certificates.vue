<template>
  <div>
    <v-sheet class="text-center">
      <v-btn large>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn large>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-sheet>
    <v-carousel
      cycle
      show-arrows-on-hover
      height="100%"   
     
    >
      <v-carousel-item 
        v-for="(src, i) in slides" 
        :key="i"
        :src="src" 
       >
      </v-carousel-item>
    </v-carousel>

    <v-btn large>
        close
        <v-icon>mdi-close</v-icon>
      </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({ 
    slides: [
      require('@/assets/blockchain-certificate.jpg')
    ]
  }),
}
</script>