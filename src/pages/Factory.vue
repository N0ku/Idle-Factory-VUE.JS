<template>
  <h1>Factory</h1>
  <h2>{{ resources }}</h2>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "FactoryPage",
  data() {
    return {
      resources: {},
    };
  },
  computed: {
    ...mapStores(useMyStore),
  },
  mounted() {
    this.myStore.getResources();
    this.resources = this.myStore.resources;
    console.log(this.resources);
  },
};
</script>