<template>
  <h1>DisplayRes</h1>
  <p>{{ user }}</p>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "DisplayRes",
  data() {
    return {
      factories: [],
      users: {},
      username: "",
      user: {},
    };
  },
  methods: {
    loadData(users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].name == this.username) {
          this.user = this.users[i];
        }
      }
      for (let index = 0; index < this.user.factories.length; index++) {
        this.factories.push(this.user.factories[index]);
      }
    },
  },
  computed: {
    ...mapStores(useMyStore),
  },
  async mounted() {
    this.users = await this.myStore.getUsers();
    this.username = this.myStore.username;
    this.loadData(this.users);
    this.myStore.user = this.user;
  },
};
</script>