import { defineStore } from 'pinia'
export const useMyStore = defineStore('my', {
    state: () => ({
        users : [],
        ressources : [],
        factories : [],
        offers : []
    }),
    actions: {
        async getUsers() {
            const { data } = await fetchApiProducts()
            this.users = data
        },
        async getRessources() {
            const { data } = await fetchApiProducts()
            this.ressources = data
        },
        async getFactories() {
            const { data } = await fetchApiProducts()
            this.factories = data
        },
        async getOffers() {
            const { data } = await fetchApiProducts()
            this.offers = data
        }
    }
});