<template>
  <!-- The Modal -->
  <div class="modal" id="addModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Add New Record!</h4>
          <button type="button" class="close" @click="clearModal" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="alert alert-success" v-if="success.length > 0">
            <strong>Success!</strong> {{ success }}
          </div>
          <label for="name">Add New Task</label>
          <textarea id="name" class="form-control" v-model="record"></textarea>
          <ul v-if="errors.name" class="list-unstyled">
            <li v-for="err of errors.name" class="alert alert-danger">{{ err }}</li>
          </ul>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="clearModal" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addRecord">Save Changes</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      success:'',
      errors:[],
      record:'',
    }
  },
  mounted(){

  },
  methods:{
    addRecord(){
      axios.post('http://localhost:8000/api/tasks', {
        'name':this.record,
      })
      .then((data) => {
        this.$emit('recordadded', data);
        this.success = 'Record was added successfully !!!';
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
        this.success = '';
        });
      this.record = '';
      this.errors = [];
    },
    clearModal(){
      this.errors = [];
      this.record = '';
      this.success = '';
    }
  }
}
</script>

<style scoped>
</style>
