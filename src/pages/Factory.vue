<template>
  <DisplayOffers/>
  <DisplayRes></DisplayRes>
  <DisplayUser></DisplayUser>
</template>

<script>
import DisplayRes from '../components/DisplayRes.vue'
import DisplayUser from '../components/DisplayUser.vue'
import DisplayOffers from "../components/DisplayOffers.vue";

export default {
  name: "FactoryPage",
  components: {
    DisplayRes,
    DisplayUser,
    DisplayOffers
}
};
</script>