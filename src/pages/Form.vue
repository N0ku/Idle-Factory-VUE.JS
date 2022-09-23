<template>
  <div>
    <h1>Welcome Idle Factory:The Game 🤯</h1>
    <button @click="noAccount = false">Login</button>
    <button @click="noAccount = true">Register</button>
    <form @submit.prevent="start">
      <label for="name">Username</label>
      <input
        type="text"
        v-model="name"
        id="name"
        placeholder="Enter your name.."
      />
      <label for="resources" v-if="noAccount"
        >Choose your first factory:
      </label>
      <select name="resources" id="resources" v-model="select" v-if="noAccount">
        <option value="">--Choose a resources--</option>
        <option v-for="resource in resources" :key="resource">
          {{ resource.name }}
        </option>
      </select>
      <input type="submit" id="play-button" value="Start !" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "FormPage",
  data() {
    return {
      users: {},
      name: "",
      resources: {},
      select: "",
      noAccount: null,
    };
  },
  methods: {
    start() {
      if (this.name.length > 3) {
        this.verifyUsers(this.users);
      } else {
        console.log("Username invalid");
      }
    },
    verifyUsers(users) {
      let exist;
      this.users = users;
      for (let i = 0; i < users.length; i++) {
        if (users[i].name == this.name) {
          exist = true;
          break;
        } else {
          exist = false;
        }
      }
      this.account(exist);
    },
    sendNewAccount() {
      axios
        .post("http://localhost:3000/users", {
          id: this.users.length + 1,
          name: this.name,
          money: 1000,
          factories: [
            {
              resources: this.select,
              quantity: 10,
              production: 100,
            },
          ],
        })
        .then((res) => res);
      this.connect();
    },
    account(exist) {
      if (exist) {
        console.log("The user exist");
        this.connect();
      } else {
        this.sendNewAccount();
      }
    },
    connect() {
      this.myStore.username = this.name;
      this.$router.push("/factory");
    },
    sendUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].name == this.username) {
          return this.users[i];
        }
      }
    }
  },
  computed: {
    ...mapStores(useMyStore),
  },
  async created() {
    this.resources = await this.myStore.getResources();
    this.users = await this.myStore.getUsers();
    this.myStore.user = await this.sendUser();
  },
};
</script>

<style scoped>
</style>