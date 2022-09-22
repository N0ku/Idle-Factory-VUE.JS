<template>
  <div></div>
<button v-if="i <10" @click="levelUp()" class="upgrade-factory">Level Up !</button>
<div>{{i}}</div>
</template>

<script>
  import axios from "axios";
export default {
  name: "UpgradesComponent",
  data() {
    return {
      i:  1,
    }
  },

  methods: {
        levelUp() {
        // const API_URL = 'http://localhost:3000/factories'                                            
       

      //   fetch(API_URL + API_PATH + 'level', {
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     method: 'patch',                                                              
      //     body: JSON.stringify( { level: this.i = this.i + 1 } )                                        
      // })
      axios.patch('http://localhost:3000/factories', 
        {
          user : 1,
          ressource : 'Bois', 
          level : this.i = this.i + 1,
        });
      }
    }
  }

</script>

<style scoped>
</style>