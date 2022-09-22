<template>
  <h1>DisplayRes</h1>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "DisplayRes",
  data() {
    return {
      resources: {},
      users: {},
      username: ''
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