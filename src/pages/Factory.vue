<template>
  <h1>Factory</h1>
  <DisplayUser/>
  <UpgradesComponent/>
</template>

<script>
import DisplayUser from '../components/DisplayUser.vue';
import UpgradesComponent from '../components/DisplayUpgrades.vue';
export default {
  name: "FactoryPage",
  components:{ DisplayUser, UpgradesComponent }
};
</script>