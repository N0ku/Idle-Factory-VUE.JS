import { defineStore } from 'pinia'
import axios from "axios";

export const useMyStore = defineStore('my', {
  state: () => ({
    users: {},
    resources: {},
    factories: {},
    offers: {},
    username: ''
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
    }
  }
});