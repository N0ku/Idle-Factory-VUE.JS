<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Factory</router-link>
          <router-link to="/form">Form</router-link>
        </li>
      </ul>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      apiData: {},
    };
  },
  methods: {
    requete() {
      fetch("http://localhost:3000/factories")
        .then((result) => result.json())
        .then((json) => (this.apiData = json));
    },
  },
  mounted() {
    this.requete();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
