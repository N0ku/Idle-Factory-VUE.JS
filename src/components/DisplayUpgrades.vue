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
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "DisplayUpgrades",
  data() {
    return {
      i: 0,
      id: 0,
    };
  },

  methods: {
    levelUp() {
      axios.patch("http://localhost:3000/factories/" + this.id, {
        level: (this.i++),
      });
    },
  },
  computed: {
    ...mapStores(useMyStore),
  },
  async mounted() {
    this.id = this.myStore.user.id;
    this.i = await this.myStore.getLvlFactory(this.id);
  }
};
</script>

<style scoped>
</style>