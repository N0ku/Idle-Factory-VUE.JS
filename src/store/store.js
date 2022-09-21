import { defineStore } from 'pinia'

fetch("http://localhost:3000/ressources")
  .then((result) => {
  return result.json()
  })
  .then((json) => (this.ressources = json));

export const useMyStore = defineStore('my', {
  state: () => ({
    users : [],
    ressources : [],
    factories : [],
    offers : []
  }),
  actions: {
    async getUsers() {
      const { data } = this.json;
      this.users = data
    }
  }
});