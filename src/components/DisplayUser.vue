<template>
  <div>
    <div v-if="this.users.id == 1">
      <form submit.prevent="start">
        <input type="text" v-model="add" name="add" />
        <button type="submit" v-on:click="addResource()">Add resource</button>
      </form>
      <button v-on:click="openDelete()">Delete resource</button>
      <button v-on:click="openUpdate()">Manage resources</button>
      <button v-on:click="listResource()">List resources</button>
      <div v-show="listResources == true">
        <button v-on:click="closeList()">x</button>
        <ul v-if="list == true">
          <li v-for="resource in resources" :key="resource.id">
            {{ resource.name }}
          </li>
        </ul>
        <ul v-if="del == true">
          <li v-for="(resource, index) in resources" :key="resource.id">
            {{ resource.name }}
            <button v-on:click="deleteResource(resource.id, index)">
              Delete
            </button>
          </li>
        </ul>
        <ul v-if="update == true">
          <li v-for="resource in resources" :key="resource.id">
            {{ resource.name }}
            <form submit.prevent="start">
              <input type="text" v-model="updateValue" name="updateValue" />
              <button type="submit" v-on:click="updateResource(resource.id)">
                Update
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <ul>
        <li v-for="resource in resources" :key="resource.id">
          {{ resource.name }}
        </li>
      </ul>
    </div>
    <DisplayOffer />
  </div>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";
import axios from "axios";
import DisplayOffer from "../components/DisplayOffers.vue";

export default {
  name: "DisplayUser",
  data() {
    return {
      updateValue: "",
      add: "",
      listResources: false,
      update: false,
      del: false,
      list: false,
      resources: {},
      users: {
        id: 1,
        username: "Test",
        money: 1000,
        factories: [],
      },
    };
  },
  components: {
    DisplayOffer,
  },
  methods: {
    // Add a resource to the list of resources
    addResource() {
      this.resources.push({
        id: this.resources.length + 1,
        name: this.add,
        production_level: 1,
      });

      axios.post("http://localhost:3000/ressources", {
        id: this.resources.length + 1,
        name: this.add,
        production_level: 1,
      });
    },
    // Close the window with the list of resources
    closeList() {
      console.log(this.resources[0].id);
      this.listResources = false;
      this.del = false;
      this.update = false;
      this.list = false;
    },
    // Open the delete window with the list of resources
    openDelete() {
      this.listResources = true;
      this.del = true;
      this.update = false;
      this.list = false;
    },
    // Open the update window with the list of resources
    openUpdate() {
      this.listResources = true;
      this.update = true;
      this.list = false;
      this.del = false;
    },
    // Open the list of resources
    listResource() {
      this.listResources = true;
      this.list = true;
      this.del = false;
      this.update = false;
    },
    // Delete a resource
    deleteResource(id, index) {
      this.resources.splice(index, 1);

      async function deleted() {
        await fetch("http://localhost:3000/ressources/" + id, {
          method: "DELETE",
        });
      }
      deleted();
    },
    // Update a resource (rename the resource)
    updateResource(idOfResource) {
      console.log(idOfResource);
      axios.patch("http://localhost:3000/ressources/" + idOfResource, {
        id: idOfResource,
        name: this.updateValue,
        production_level: this.resources[idOfResource].production_level,
      });
    },
  },
  computed: {
    ...mapStores(useMyStore),
  },
  mounted() {
    this.myStore.getResources();
    this.resources = this.myStore.resources;
  },
};
</script>

<style scoped>
</style>