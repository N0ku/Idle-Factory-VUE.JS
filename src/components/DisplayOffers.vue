<template>
  <div>
    <button v-on:click="displayOffer()">Open offers</button>
    <div v-if="dispOffer == true">
      <ul>
        <button v-on:click="buy()">Buy</button>
        <button v-on:click="sells()">Sell</button>
        <div v-if="buys == true">
          <li v-for="offer in offers" :key="offer.resource">
            <div v-if="this.offer.status == 'OPEN' && this.offer.type == 'WTS'">
              <p> {{offer.resource}} </p>
              <p> {{offer.price}} </p>
              <p> {{offer.quantity}} </p>
              <button v-on:click="buyOffer()">Buy this offer</button>
            </div>
          </li>
        </div>
        <div v-if="sell == true">
          <li v-for="offer in offers" :key="offer.resource">
            <div v-if="this.offer.status == 'OPEN' && this.offer.type == 'WTB'">
              <p> {{offer.resource}} </p>
              <p> {{offer.price}} </p>
              <p> {{offer.quantity}} </p>
              <button v-on:click="sellOffer()">Sell your resource</button>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import { useMyStore } from '../store/store'
  import { mapStores } from 'pinia'
  // import axios from 'axios';

  export default {
      name:"DisplayOffer",
      data() {
        return {
          dispOffer: false,
          offers: {},
          buys: false,
          sell: false,
        }
      },
      methods: {
        displayOffer(){
          console.log(this.dispOffer);
          this.dispOffer = true;
        },
        buy(){
          this.buys = true;
          this.sell = false;
        },
        sells(){
          this.buys = false;
          this.sell = true;
        },
        buyOffer(){

        },
        sellOffer(){

        }
      },
      computed: {
        ...mapStores(useMyStore)
      },
      mounted() {
        this.myStore.getOffers();
        this.offers = this.myStore.offers;
        
      }
  }

</script>

<style scoped>

</style>