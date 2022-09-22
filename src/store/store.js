import { defineStore } from 'pinia'
import axios from "axios";

export const useMyStore = defineStore('my', {
  state: () => ({
    users : [],
    resources : [],
    factories : [],
    offers : []
  }),
  actions: {
    async getUsers() {
      axios.get("http://localhost:3000/users")
        .then((result) => this.users = result.data)
    },
    async getResources() {
      axios.get("http://localhost:3000/ressources")
        .then((result) => this.resources = result.data)
    },
    async getOffers() {
      axios.get("http://localhost:3000/offers")
        .then((result) => this.offers = result.data)
    }
  }
});