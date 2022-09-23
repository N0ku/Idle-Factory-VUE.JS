<template>
  <div class="factory">
    <div class="box-resources">
      <h1>{{ currentResName }}</h1>
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
  <form @submit.prevent="createFactory">
    <label id="label-choose-factory" for="resources"
      >Choose your new factory:
    </label>
    <select name="resources" id="resources" v-model="select">
      <option value="">--Choose a resources--</option>
      <option v-for="resource in resources" :key="resource">
        {{ resource.name }}
      </option>
    </select>
    <input type="submit" id="play-button-1" value="Create !" />
  </form>
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
      resources: {},
      user: {} /* Us */,
      page: 0,
      p: null,
      i: 0,
      id: 0,
      currentResName: "",
      allFactories: [] /* All Factories in the all game */,
      image: "/src/assets/giffactory.gif",
      select: "",
      idFactory: 0,
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
    createFactory() {
      let data = {
        resources: this.select,
        quantity: 10,
        production: 100,
      };
      this.factories.push(data);
      axios.patch("http://localhost:3000/users/" + this.id, {
        factories: this.factories,
      });

      axios.post("http://localhost:3000/factories", {
        user: this.id,
        name: this.select,
        level: 1,
      });
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
      this.getIdFacto();
      for (let i = 0; i < this.factories.length; i++) {
        if (this.factories[i].quantity < 100) {
          return 0;
        } else {
          console.log(this.factory);
          axios.patch("http://localhost:3000/users/" + this.id, {
            factories: [
              {
                name: this.factories[i].name,
                quantity:
                  this.factories[i].quantity - 100 * this.allFactories.level,
                production: this.factories[i].production * 2,
              },
            ],
          });
          axios.patch("http://localhost:3000/factories/" + this.idFactory, {
            level: this.i++,
          });
        }
      }
    },
    getIdFacto() {
      for (let index = 0; index < this.allFactories.length; index++) {
        let facto = this.allFactories[index];
        if (facto.user == this.id && facto.name == this.factory.resources) {
          this.idFactory = facto.id;
          break;
        }
      }
    },
    async factoryProduction() {
      console.log(this.factory);
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
    this.allFactories = await this.myStore.getFactories();
    this.resources = await this.myStore.getResources();
    this.loadData(this.users);
    this.myStore.currentResource = await this.sendResource();
    this.myStore.user = this.user;
    this.id = this.user.id;
    this.currentResName = this.factory.resources;
  },
  mounted() {
    this.p = setInterval(this.factoryProduction, 5000);
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