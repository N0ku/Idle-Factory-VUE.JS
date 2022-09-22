<template>
  <div>
    <button v-on:click="displayOffer()">Open offers</button>
    <div v-if="dispOffer == true">
      <button v-on:click="closeOffer()">x</button>
      <button v-on:click="addOffer()">Add</button>
      <ul>
        <button v-on:click="buy()">Buy</button>
        <button v-on:click="sells()">Sell</button>
        <div v-if="buys == true">
          <li v-for="offer in offers" :key="offer.resource">
            <div v-if="offer.status == 'OPEN' && offer.type == 'WTS'">
              <p> {{offer.resource}} </p>
              <p> {{offer.price}} </p>
              <p> {{offer.quantity}} </p>
              <button v-on:click="buyOffer()">Buy this offer</button>
            </div>
          </li>
        </div>
        <div v-if="sell == true">
          <li v-for="offer in offers" :key="offer.resource">
            <div v-if="offer.status == 'OPEN' && offer.type == 'WTB'">
              <p> {{offer.resource}} </p>
              <p> {{offer.price}} </p>
              <p> {{offer.quantity}} </p>
              <button v-on:click="sellOffer()">Sell your resource</button>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div v-if="add == true">
      <button v-on:click="closeAddOffer()">x</button>
      <form submit.prevent="start">
        <label>Resource</label>
        <input v-model="re_source" type="text">
        <label>Price</label>
        <input v-model="prize" type="text">
        <label>Quantity</label>
        <input v-model="quantities" type="text">
        <label>Type</label>
        <select v-model="typ">
          <option value="WTB">WTB</option>
          <option value="WTS">WTS</option>
        </select>
        <button type="submit" v-on:click="createOffer()">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { useMyStore } from '../store/store'
  import { mapStores } from 'pinia'
import axios from 'axios';
  // import axios from 'axios';

  export default {
      name:"DisplayOffer",
      data() {
        return {
          dispOffer: false,
          offers: {},
          users: {},
          buys: false,
          sell: false,
          re_source: "",
          prize: 1,
          quantities: 1,
          typ: "WTS"
        }
      },
      methods: {
        displayOffer(){
          console.log(this.offers[0].status);
          this.dispOffer = true;
        },
        closeOffer(){
          this.dispOffer = false;
        },
        addOffer(){
          this.dispOffer = false;
          this.add = true;
        },
        closeAddOffer(){
          this.add = false;
          this.dispOffer = true;
        },
        createOffer(){
          axios.post(
            'http://localhost:3000/offers',
            {
              id: 0,
              status: "OPEN",
              resource: this.re_source,
              price: this.prize,
              quantity: this.quantities,
              type: this.typ
            }
          );
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
        this.myStore.getUsers();
        this.factories = this.myStore.users;
      }
  }

</script>

<style scoped>

</style>