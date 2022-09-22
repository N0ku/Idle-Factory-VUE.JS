import { defineStore } from 'pinia'
import axios from "axios";

export const useMyStore = defineStore('my', {
  state: () => ({
    users : [],
    ressources : [],
    factories : [],
    offers : []
  }),
  actions: {
    async getUsers() {
      axios.get("http://localhost:3000/users")
        .then((result) => this.users = result.data)
    },
    async getRessources() {
      axios.get("http://localhost:3000/ressources")
        .then((result) => this.ressources = result.data)
    }
  }
});