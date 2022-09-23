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

button,
input[type="button"] {
  border: 5px solid rgb(71, 40, 18);
  background-color: rgb(198, 139, 94);
  font-family: SvRegular;
  font-size: 50px;
  color: rgb(71, 40, 18);
  border-radius: 10px;
  margin: 10px;
}

#label-name {
  font-family: "SvRegular";
  font-size: 25px;
  padding: 10px;
  letter-spacing: 2px;
  color: rgb(255, 184, 130);
}

#name {
  background-color: rgb(198, 139, 94);
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  border: none;
  outline: transparent;
  width: 150px;
  height: 25px;
  padding-left: 10px;
}

#name:focus {
  outline: 3px solid rgb(71, 40, 18);
}

#play-button {
  background-color: rgb(198, 139, 94);
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  border: none;
  outline: transparent;
  width: 100px;
  height: 25px;
  margin-top: 10px;
}

#play-button:hover {
  outline: 3px solid rgb(71, 40, 18);
}

#label-choose-factory {
  font-family: "SvRegular";
  font-size: 25px;
  padding: 10px;
  letter-spacing: 2px;
  color: rgb(255, 184, 130);
}

#resources {
  background-color: rgb(198, 139, 94);
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  border: none;
  outline: transparent;
  width: 170px;
  height: 25px;
  margin-top: 10px;
}

#resources:focus {
  outline: 3px solid rgb(71, 40, 18);
}

#label-quantity,
#label-production {
  font-family: "SvRegular";
  font-size: 25px;
}

#production,
#quantity {
  font-family: "SvRegular";
  font-size: 25px;
  line-height: 50px;
  background-color: rgb(198, 139, 94);
  outline: 3px solid rgb(71, 40, 18);
  border-radius: 5px;
}

#production {
  width: 70px;
  height: 50px;
}

#quantity {
  font-family: "SvRegular";
}
</style>
