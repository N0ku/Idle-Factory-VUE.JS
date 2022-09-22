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
  methods: {},
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
