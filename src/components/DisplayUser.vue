<template>
    <div>
      <div v-if="this.ressources.id == 1">
        <ul>

        </ul>
        <input type="text" name="add" id="add"> 
        <button v-on:click="addRessource()">Add ressource</button>
        <button v-on:click="openDelete()">Delete ressource</button>
        <button v-on:click="openUpdate()">Manage ressources</button>
        <button v-on:click="listRessource()">List ressources</button>
        <div v-show="listRessources == true">
          <button v-on:click="closeList()"></button>
          <ul v-if="list == true">
            <li v-for="ressource in ressources" :key="ressource.id">
              {{ ressource.name }}
            </li>
          </ul>
          <ul v-if="del == true">
            <li v-for="ressource in ressources" :key="ressource.id">
              {{ ressource.name }} <button v-on:click="deleteRessource(ressource[id])"></button>
            </li>
          </ul>
          <ul v-if="update == true">
            <li v-for="ressource in ressources" :key="ressource.id">
              {{ ressource.name }} 
              <input type="text" name="updateValue" id="updateValue">
              <!--<button v-on:click="updateRessource(ressource[id])"></button>-->
            </li>
          </ul>
        </div>
      </div>
      <div>
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

    export default {
        name:"DisplayUser",
        data() {
          return {
            listRessources : false,
            update : false,
            del : false,
            list : false,
            ressources: {},
            users: {}
          }
        },
        methods: {
          // Add a ressource to the list of ressources
          addRessource(){
            var ressource = document.getElementById('add').getAttribute("value");
            this.ressources.push({id: this.ressources.length+1, name: ressource, production_level: 1});

            async function postData(url = '', data = {}) {
              const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            return response.json();
          }

          postData('http://localhost:3000/ressources', this.ressources)
            .then((data) => {
              console.log(data);
            });

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