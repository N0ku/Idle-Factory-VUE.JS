<template>
  <DisplayRes></DisplayRes>
  <DisplayUser></DisplayUser>
</template>

<script>
import DisplayRes from '../components/DisplayRes.vue'
import DisplayUser from '../components/DisplayUser.vue'

export default {
  name: "FactoryPage",
  components: {
    DisplayRes,
    DisplayUser
}
};
</script>