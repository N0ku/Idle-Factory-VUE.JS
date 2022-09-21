<template>
  <div>
    <h1>Welcome Idle Factory:The Game 🤯</h1>
    <label for="username">Username</label>
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Enter your username.."
    />
    <button type="submit" id="play-button" v-on:click="start()">Start !</button>
    <p>{{ users }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormPage",
  data() {
    return {
      users: {},
      username: "",
    };
  },
  methods: {
    start() {
      this.username = document.getElementById("username").value;
      let exist;
      if (this.username.length > 3) {
        fetch("http://localhost:3000/users")
          .then((result) => result.json())
          .then((response) => (this.users = response));

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username == this.username) {
            exist = true;
          } else {
            exist = false;
          }
        }
        this.connect(exist);
      } else {
        console.log("Pseudo invalide");
      }
    },
    createAccount() {
      axios
        .put("http://localhost:3000/users", {
          id: "2",
          name: this.username,
          money: 1000,
          factories: [],
        })
        .then((res) => console.log(res));
    },
    connect(exist) {
      if (exist) {
        console.log("The user exist");
      } else {
        this.createAccount();
      }
    },
  },
};
</script>

<style scoped>
</style>