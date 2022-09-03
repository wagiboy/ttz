<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { Navbar, Footer },  
  data: () => ({
    //
  }),
  created() {
    //console.log('App::created()')
  }
};
</script>
