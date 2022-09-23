<template>
  <DisplayFactory></DisplayFactory>
  <DisplayUser></DisplayUser>
</template>

<script>
import DisplayFactory from '../components/DisplayFactory.vue'
import DisplayUser from '@/components/DisplayUser.vue';

export default {
  name: "FactoryPage",
  components: {
    DisplayFactory,
    DisplayUser
}
};
</script>