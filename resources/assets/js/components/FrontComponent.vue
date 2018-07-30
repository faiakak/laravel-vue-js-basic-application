<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">
                    <h4>Todo List <span class="float-sm-right"><button  type="button" class="btn btn-success btn-xs" data-toggle="modal" data-target="#addModal">+</button></span></h4></div>
                    <div class="card-body">
                      <input type="search" v-model="search" @keyup="searchRecord" placeholder="" >
                      <ul class="list-group">
                        <li class="list-group-item" v-for="t in tasks.data">{{ t.id }} - {{ t.name }}<span class="float-sm-right"><button class="btn btn-success btn-xs" data-toggle="modal" data-target="#editModal" @click="getRecord(t.id)" >Edit</button> | <button @click="deleteRecord(t.id)" class="btn btn-danger btn-xs">Delete</button> | <button class="btn btn-primary btn-xs"  data-toggle="modal" data-target="#viewModal" @click="getRecord(t.id)">View</button></span></li>
                      </ul>
                      <pagination :data="tasks" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <div id="model">
          <addTask @recordadded="refreshRecord"></addTask>
          <editTask :rec="editRec" @recordupdated="refreshRecord"></editTask>
          <viewTask :viewRec="editRec" ></viewTask>
        </div>
    </div>
</template>

<script>
  Vue.component('pagination', require('laravel-vue-pagination'));
  Vue.component('addTask', require('./addModelComponent.vue'));
  Vue.component('editTask', require('./editModelComponent.vue'));
  Vue.component('viewTask', require('./viewModelComponent.vue'));
    export default {
        data(){
          return{
            tasks:{},
            editRec:{},
            search:'',
          }
        },
        mounted() {
            console.log('Front Component mounted.')
        },
        created(){
          axios.get('http://localhost:8000/api/tasks')
          .then((response) => this.tasks = response.data)
          .catch((error) => console.log(error));
        },
        methods: {
      		getResults(page = 1) {
      			axios.get('http://localhost:8000/api/tasks?page=' + page)
      				.then(response => {
      					this.tasks = response.data;
      				});
      		},
          refreshRecord(record){
            this.tasks = record.data
          },
          getRecord(id){
            axios.get('http://localhost:8000/api/tasks/'+id+'/edit')
            .then((response) => this.editRec = response.data)
            .catch((error) => console.log(error));
          },
          deleteRecord(id){
            const reply = confirm("Do you really want to delete this record");
            if(reply){
              axios.post('http://localhost:8000/api/tasks/'+id,{
                id:id,
                _method:'DELETE'
              })
              .then((response) => this.tasks = response.data)
              .catch((error) => console.log(error));
            }else{
              return;
            }
          },
          searchRecord(){
            if(this.search.length >= 3){
              axios.get('http://localhost:8000/api/tasks/search/'+ this.search)
              .then((response) => this.tasks = response.data)
              .catch((error) => console.log(error));
            }else{
              this.getResults();
            }
          }
      	}
    }
</script>
