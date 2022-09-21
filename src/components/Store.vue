<template>
  <div></div>
</template>

<script>
import { useMyStore } from "../store/store.js";
import { mapStores, mapState } from "pinia";
export default {
  name: "StorePage",
  computed: {
    // crée une computed nommée 'id' + 'Store' (donc ici myStore)
    ...mapStores(useMyStore),
    // crée une computed avec le nom 'products' contenant la state.products de myStore
    ...mapState(useMyStore, ["products"]),
  },

  beforeMount() {
    // exemple, ici on fetch la data avant que le composant soit monté
    this.myStore.getProducts();
  },
};
</script>

<style scoped>
</style>