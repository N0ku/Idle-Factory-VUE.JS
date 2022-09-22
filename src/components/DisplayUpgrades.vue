<template>
  <div></div>
  <button v-if="i < 10" @click="levelUp" class="upgrade-factory">
    Level Up !
  </button>
  <div>
    <p>Level :</p>
    {{ i }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DisplayUpgrades",
  data() {
    return {
      i: 1,
    };
  },

  methods: {
    levelUp() {
      axios.patch("http://localhost:3000/factories/1", {
        level: (this.i = this.i + 1),
      });
    },
  },
};
</script>

<style scoped>
</style>