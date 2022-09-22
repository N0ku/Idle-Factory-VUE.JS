<template>
  <div v-if="dispOffer == true">
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
            <button v-on:click="buyOffer(offer)">Buy this offer</button>
          </div>
        </li>
      </div>
      <div v-if="sell == true">
        <li v-for="offer in offers" :key="offer.resource">
          <div v-if="offer.status == 'OPEN' && offer.type == 'WTB'">
            <p> {{offer.resource}} </p>
            <p> {{offer.price}} </p>
            <p> {{offer.quantity}} </p>
            <button v-on:click="sellOffer(offer)">Sell your resource</button>
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
</template>

<script>
  import { useMyStore } from '../store/store'
  import { mapStores } from 'pinia'
  import axios from 'axios';

  export default {
    name:"DisplayOffers",
    data() {
      return {
        dispOffer: true,
        offers: {},
        users: {},
        buys: false,
        sell: false,
        re_source: "",
        prize: 1,
        quantities: 1,
        typ: "WTS",
        username: ""
      }
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
      for(let i = 0; i < this.users.length; i++){
        if (this.users[i].name == this.username){
          if(this.typ == 'WTS'){
            for( let j = 0; j < this.users.factories.length; j++){
              if(this.users.factories[j].resource == this.re_source){
                if(this.users.factories[j].quantity < this.quantities){
                  return 0;
                }
                else{
                  this.users.factories[j].quantity -= this.quantities;
                  axios.post(
                    'http://localhost:3000/offers',
                    {
                      id: this.users[i].id,
                      status: "OPEN",
                      resource: this.re_source,
                      price: this.prize,
                      quantity: this.quantities,
                      type: this.typ
                    }
                  );
                }
              }
            } 
          }
          else{
            for( let j = 0; j < this.users.length; j++){
              if(this.users.factories[j].resource == this.re_source){
                if(this.users.money < this.price){
                  return 0;
                }
                else{
                  this.users.money -= this.price;
                  axios.post(
                    'http://localhost:3000/offers',
                    {
                      id: this.users[i].id,
                      status: "OPEN",
                      resource: this.re_source,
                      price: this.prize,
                      quantity: this.quantities,
                      type: this.typ
                    }
                  );
                }
              }
            } 
          }
        }
      }
    },
    buy(){
      this.buys = true;
      this.sell = false;
    },
    sells(){
      this.buys = false;
      this.sell = true;
    },
    buyOffer(offer){
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].name == this.username){
          if(this.users[i].money < offer.price){
            return 0;
          }
          else{
            this.users[i].money -= offer.price;
          }
          for(let j = 0; j < this.users[i].factories.length; j++){
            if(this.users[i].factories[j].name == offer.resource){
              this.users[i].factories[j].quantity += offer.quantity;
            }
          } 
          for(let k = 0; k < this.users.length; k++) {
            if(this.users[k].id == offer.id){
              this.users[k].money += offer.price;
            }
          }
        }
        this.offers.status = "CLOSED";

        axios.patch('http://localhost:3000/offers', {
          statut: this.offers.status
        })
      }
    },
    sellOffer(offer){
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].name == this.username){
          this.users[i].money += offer.price;
          for(let j = 0; j < this.users[i].factories.length; j++){
            if(this.users[i].factories[j].name == offer.resource){
              if(this.users[i].factories[j].quantity < offer.quantity){
                return 0;
              }
              else{
                this.users[i].factories[j].quantity -= offer.quantity;
              }
            }
          } 
          for(let k = 0; k < this.users.length; k++) {
            if(this.users[k].id == offer.id){
              if(this.users[k].money < offer.price){
                return 0;
              }
              else{
                this.users[k].money -= offer.price;
              }
            }
          }
        }
        this.offers.status = "CLOSED";

        axios.patch('http://localhost:3000/offers', {
          statut: this.offers.status
        })
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
      this.username = this.myStore.username;
    }
  }

</script>

<style scoped>

</style>