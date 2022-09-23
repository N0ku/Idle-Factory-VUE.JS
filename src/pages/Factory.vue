<template>
  <DisplayFactory></DisplayFactory>
  <DisplayUpgrades></DisplayUpgrades>
</template>

<script>
import DisplayFactory from '../components/DisplayFactory.vue'
import DisplayUpgrades from '@/components/DisplayUpgrades.vue';

export default {
  name: "FactoryPage",
  components: {
    DisplayFactory,
    DisplayUpgrades
}
};
</script>