<template>
  <div class="factory">
    <div class="box-resources">
      <h1>{{ factory.resources }}</h1>
      <div class="box-resources-infos">
        <p>Quantity : {{ factory.quantity }}</p>
        <p>Production : {{ factory.production }}/min</p>
      </div>
    </div>
    <div class="canvas">
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
      p: null,
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
    },
    updatePage(page) {
      console.log("update page");
      this.page = page;
      console.log(this.page);
      this.factory = this.user.factories[this.page];
      this.myStore.currentResource = this.factory.resources;
    },
    product() {
      for (let i = 0; i < this.factories.length; i++) {
        this.factories[i].quantity += this.factories[i].production;
      }
      let data = {
        id: this.user.id,
        name: this.username,
        money: this.user.money,
        factories: this.factories,
      };
      this.myStore.sendProduction(data, this.user.id);
    },
    sendResource() {
      return this.factory.resources;
    },
    async factoryProduction() {
      this.users = await this.myStore.getUsers();
      this.username = this.myStore.username;
      this.loadData(this.users);
      this.myStore.user = this.user;
      this.product();
      console.log("production in progress..");
    },
  },
  computed: {
    ...mapStores(useMyStore),
  },
  async created() {
    this.users = await this.myStore.getUsers();
    this.username = this.myStore.username;
    this.loadData(this.users);
    this.myStore.currentResource = await this.sendResource();
    this.myStore.user = this.user;
  },
  mounted() {
    this.p = setInterval(this.factoryProduction, 60000);
  },
  beforeUnmount() {
    clearInterval(this.p);
  },
};
</script>

<style scoped>
  .pagination button{
    font-size: 30px;
    width:50px;
    height:50px;
  }
</style>