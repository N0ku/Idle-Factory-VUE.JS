<template>
  <h1>Home page</h1>
  <DisplayUser/>
</template>

<script>
import DisplayUser from '../components/DisplayUser.vue';
export default {
  name: "FactoryPage",
  components:{ DisplayUser,
  }
};
</script>