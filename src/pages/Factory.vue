<template>
  <h1>Factory</h1>
  <h2>{{ users }}</h2>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "FactoryPage",
  data() {
    return {
      resources: {},
      users: {},
    };
  },
  methods: {
    async getData() {
      this.users = await this.myStore.getUsers();
    },
  },
  computed: {
    ...mapStores(useMyStore),
  },
  mounted() {
    this.getData();
  },
};
</script>