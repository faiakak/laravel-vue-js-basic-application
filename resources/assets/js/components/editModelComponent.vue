<template>
  <!-- The Modal -->
  <div class="modal" id="editModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit Record!</h4>
          <button type="button" class="close" @click="clearModal" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="alert alert-success" v-if="success.length > 0">
            <strong>Success!</strong> {{ success }}
          </div>
          <label for="name">Edit Task</label>
          <textarea id="name" class="form-control" v-model="rec.name"></textarea>
          <ul v-if="errors.name" class="list-unstyled">
            <li v-for="err of errors.name" class="alert alert-danger">{{ err }}</li>
          </ul>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="clearModal" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="updateRecord">Update Changes</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default{
  props:['rec'],
  data(){
    return{
      success:'',
      errors:[],
    }
  },
  mounted(){

  },
  methods:{
    updateRecord(){
      axios.post('http://localhost:8000/api/tasks/'+this.rec.id, {
        'name':this.rec.name,
        '_method':'PUT',
      })
      .then((data) => {
        this.$emit('recordupdated', data);
        this.success = 'Record was updated successfully !!!';
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
        this.success = '';
        });
      this.errors = [];
    },
    clearModal(){
      this.errors = [];
      this.success = '';
    }
  }
}
</script>

<style scoped>
</style>
