import { defineStore } from 'pinia'
import axios from "axios";

export const useMyStore = defineStore('my', {
  state: () => ({
    users: {},
    resources: {},
    factories: {},
    offers: {},
    username: '',
    user: {},
    currentLvl: 1,
    currentResource: ''
  }),
  actions: {
    async getUsers() {
      await axios.get("http://localhost:3000/users")
        .then((result) => { this.users = result.data })
      return this.users;
    },
    async getResources() {
      await axios.get("http://localhost:3000/ressources")
        .then((result) => this.resources = result.data)
      return this.resources;
    },
    async getFactories() {
      await axios.get("http://localhost:3000/factories")
        .then((result) => {
          this.factories = result.data
        })
      return this.factories;
    },
    async getOffers() {
      await axios.get("http://localhost:3000/offers")
        .then((result) => this.offers = result.data)
      return this.offers;
    },
    // eslint-disable-next-line no-unused-vars
   /*  async getLvlFactory(id, resource) {
      console.log("HEY");
      await axios.get("http://localhost:3000/factories/" + id)
        .then((result) => {
          console.log(result);
        })
      return this.currentLvl;
    }, */
    async sendProduction(production, id) {
      axios.patch(`http://localhost:3000/users/` + id ,production)
    }
  }
});