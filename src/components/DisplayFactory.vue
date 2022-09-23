<template>
  <div class="factory">
    <div class="box-resources">
      <h1>{{ factory.resources }}</h1>
      <div class="box-resources-infos">
        <p id="label-quantity">Quantity :</p>
        <p id="quantity">{{ factory.quantity }}</p>
        <p id="label-production">Production :</p>
        <p id="production">{{ factory.production }}/min</p>
      </div>
    </div>
    <div class="canvas">
      <p>Factory design</p>
      <img v-bind:src="image" alt="factory gif" />
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
    <button v-if="i < 10" v-on:click="levelUp()" class="upgrade-factory">
      Level Up !
    </button>
    <p>Level :</p>
    {{ i }}
  </div>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";
import axios from "axios";

export default {
  name: "DisplayRes",
  data() {
    return {
      factories: [] /* All Factories of the user */,
      factory: [] /* Current factory */,
      users: {} /* All users */,
      username: "",
      user: {} /* Us */,
      page: 0,
      p: null,
      i: 0,
      id: 0,
      currentResName: "",
      allFactories: {} /* All Factories in the all game */,
      image: "/src/assets/giffactory.gif",
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
    levelUp() {
      for (let i = 0; i < this.factories.length; i++) {
          console.log("test");
          if (this.factories[i].quantity < 100) {
            return 0;
          } else {
            console.log("test done");
            axios.patch("http://localhost:3000/users/" + this.user.id, {
              factories: [
                {
                  name: this.factories[i].name,
                  quantity:
                    this.factories[i].quantity -
                    100 * this.factory.level,
                  production: this.factories[i].production * 2,
                },
              ],
            });
            axios.patch("http://localhost:3000/factories/" + 3, {
              level: this.i++,
            });
          }
      }
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
    this.allFactories = this.myStore.getFactories();
    this.loadData(this.users);
    this.myStore.currentResource = await this.sendResource();
    this.myStore.user = this.user;
    this.id = this.user.id;
    this.currentResName = this.factory.resources;
    console.log(this.factory);
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
.pagination button {
  font-size: 30px;
  width: 50px;
  height: 50px;
}
</style>