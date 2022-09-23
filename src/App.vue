<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "SvAll";
  src: url("./assets/fonts/SvAll.ttf");
}
@font-face {
  font-family: "SvRegular";
  src: url("./assets/fonts/SvRegular.ttf");
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: #205d7e;
  color: white;
}

h1 {
  font-family: "SvAll";
  letter-spacing: 2px;
  color: rgb(198, 139, 94);
}

button,input[type="button"]{
  border: 5px solid rgb(71, 40, 18);
  background-color: rgb(198, 139, 94);
  font-family: SvRegular;
  font-size: 50px;
  color: rgb(71, 40, 18);
}
</style>
