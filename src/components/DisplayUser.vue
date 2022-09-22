<template>
    <div>
      <div v-if="this.users.id == 1">
        <ul>

        </ul>
        <form submit.prevent="start">
          <input type="text" v-model="add" id="add"> 
          <button type="submit" v-on:click="addRessource()">Add ressource</button>
        </form>
        <button v-on:click="openDelete()">Delete ressource</button>
        <button v-on:click="openUpdate()">Manage ressources</button>
        <button v-on:click="listRessource()">List ressources</button>
        <div v-show="listRessources == true">
          <button v-on:click="closeList()">x</button>
          <ul v-if="list == true">
            <li v-for="ressource in ressources" :key="ressource.id">
              {{ ressource.name }}
            </li>
          </ul>
          <ul v-if="del == true">
            <li v-for="ressource in ressources" :key="ressource.id">
              {{ ressource.name }} <button v-on:click="deleteRessource(ressource[id])">Delete</button>
            </li>
          </ul>
          <ul v-if="update == true">
            <li v-for="ressource in ressources" :key="ressource.id">
              {{ ressource.name }} 
              <input type="text" name="updateValue" id="updateValue">
              <!--<button v-on:click="updateRessource(ressource[id])">Update</button>-->
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <ul>
          <li v-for="ressource in ressources" :key="ressource.id">
            {{ ressource.name }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import { useMyStore } from '../store/store'
    import { mapStores } from 'pinia'
import axios from 'axios';

    export default {
        name:"DisplayUser",
        data() {
          return {
            add: "",
            listRessources : false,
            update : false,
            del : false,
            list : false,
            ressources: {},
            users: {
              "id": 1,
              "username": "Test",
              "money": 1000,
              "factories": []
            }
          }
        },
        methods: {
          // Add a ressource to the list of ressources
          addRessource(){
            this.ressources.push({id: this.ressources.length+1, name: this.add, production_level: 1});

            axios.post(
              'http://localhost:3000/ressources',
              {
                id: this.ressources.length+1,
                name: this.add,
                production_level: 1
              }
            );
          },
          // Close the window with the list of ressources
          closeList(){
            this.listRessources = false;
            this.del = false;
            this.update = false;
            this.list = false;
          },
          // Open the delete window with the list of ressources
          openDelete(){
            this.listRessources = true;
            this.del = true;
          },
          // Open the update window with the list of ressources
          openUpdate(){
            this.listRessources = true;
            this.update = true;
          },
          // Open the list of ressources
          listRessource(){
            this.listRessources = true;
            this.list = true;
          },
          // Delete a ressource
          deleteRessource(id){
            this.ressources.splice(id, 1);

            async function deleted() {
              await fetch('http://localhost:3000/ressources', { method: 'DELETE' });
            }
            deleted();
          },
          // Update a ressource (rename the ressource)
          updateRessource(id){
            this.ressources[id].name = document.getElementById('updateValue').setAttribute("value");
          }
        },
        computed: {
          ...mapStores(useMyStore)
        },
        mounted() {
          this.myStore.getRessources();
          this.ressources = this.myStore.ressources;
          
        }
    }

</script>

<style scoped>

</style>