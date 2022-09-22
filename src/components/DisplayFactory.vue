<template>
  <div class="factory">
    <div class="box-resources">
      <h1>{{ factory.resources }}</h1>
      <div class="box-resources-infos">
        <p>{{ factory.quantity }}</p>
        <p>{{ factory.production }}</p>
      </div>
    </div>
    <div class="canva">
      <p>Factory design</p>
    </div>
    <div class="pagination">
      <button
        v-for="(factory, index) in factories"
        :key="factory"
        v-on:click="updatePage(index)"
      >
        {{ index }}
      </button>
    </div>
  </div>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "DisplayRes",
  data() {
    return {
      factories: [],
      factory: [],
      users: {},
      username: "",
      user: {},
      page: 0,
    };
  },
  methods: {
    loadData(users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].name == this.username) {
          this.user = this.users[i];
        }
      }
      this.factory = this.user.factories[this.page];
      this.factories = this.user.factories;
      console.log(this.factories);
      console.log(this.factory);
    },
    updatePage(page) {
      console.log("update page");
      this.page = page;
      console.log(this.page);
      this.factory = this.user.factories[this.page];
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