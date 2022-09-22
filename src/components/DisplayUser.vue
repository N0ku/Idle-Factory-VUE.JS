<template>
  <div>
    <div v-if="this.resources.id == 1">
      <ul></ul>
      <input type="text" name="add" id="add" />
      <button v-on:click="addResource()">Add resource</button>
      <button v-on:click="openDelete()">Delete resource</button>
      <button v-on:click="openUpdate()">Manage resources</button>
      <button v-on:click="listResource()">List resources</button>
      <div v-show="listResources == true">
        <button v-on:click="closeList()"></button>
        <ul v-if="list == true">
          <li v-for="resource in resources" :key="resource.id">
            {{ resource.name }}
          </li>
        </ul>
        <ul v-if="del == true">
          <li v-for="resource in resources" :key="resource.id">
            {{ resource.name }}
            <button v-on:click="deleteResource(resource[id])"></button>
          </li>
        </ul>
        <ul v-if="update == true">
          <li v-for="resource in resources" :key="resource.id">
            {{ resource.name }}
            <input type="text" name="updateValue" id="updateValue" />
            <!--<button v-on:click="updateResource(resource[id])"></button>-->
          </li>
        </ul>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="resource in resources" :key="resource.id">
          {{ resource.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useMyStore } from "../store/store";
import { mapStores } from "pinia";

export default {
  name: "DisplayUser",
  data() {
    return {
      listResources: false,
      update: false,
      del: false,
      list: false,
      resources: {},
      users: {},
    };
  },
  methods: {
    // Add a resource to the list of resources
    addResource() {
      var resource = document.getElementById("add").getAttribute("value");
      this.resources.push({
        id: this.resources.length + 1,
        name: resource,
        production_level: 1,
      });

      async function postData(url = "", data = {}) {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
        });
        return response.json();
      }

      postData("http://localhost:3000/resources", this.resources).then(
        (data) => {
          console.log(data);
        }
      );
    },
    // Close the window with the list of resources
    closeList() {
      this.listResources = false;
      this.del = false;
      this.update = false;
      this.list = false;
    },
    // Open the delete window with the list of resources
    openDelete() {
      this.listResources = true;
      this.del = true;
    },
    // Open the update window with the list of resources
    openUpdate() {
      this.listResources = true;
      this.update = true;
    },
    // Open the list of resources
    listResource() {
      this.listResources = true;
      this.list = true;
    },
    // Delete a resource
    deleteResource(id) {
      this.resources.splice(id, 1);
    },
    // Update a resource (rename the resource)
    updateResource(id) {
      this.resources[id].name = document
        .getElementById("updateValue")
        .setAttribute("value");
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