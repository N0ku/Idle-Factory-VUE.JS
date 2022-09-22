<template>
  <div>
    <h1>Welcome Idle Factory:The Game 🤯</h1>
    <label for="name">Username</label>
    <form @submit.prevent="start">
      <input
        type="text"
        v-model="name"
        id="name"
        placeholder="Enter your name.."
      />
      <label for="resources">Choose your first factory: </label>
      <select name="resources" id="resources" v-model="select">
        <option value="">--Choose a resources--</option>
        <option v-for="resource in ressources" :key="resource">
          {{ resource.name }}
        </option>
      </select>
      <input type="submit" id="play-button" value="Start !" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormPage",
  data() {
    return {
      users: {},
      name: "",
      ressources: {},
      select: "",
    };
  },
  methods: {
    start() {
      if (this.name.length > 3) {
        fetch("http://localhost:3000/users")
          .then((result) => result.json())
          .then((users) => this.verifyUsers(users));
      } else {
        console.log("Pseudo invalide");
      }
    },
    verifyUsers(users) {
      let exist;
      console.log(users);
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
          factories: [this.select],
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
    },
  },
  created() {
    fetch("http://localhost:3000/ressources")
      .then((result) => result.json())
      .then((ressources) => (this.ressources = ressources));
  },
};
</script>

<style scoped>
</style>