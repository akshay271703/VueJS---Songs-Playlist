<template>
  <form @submit.prevent="createPlaylist">
      <h4>Create New Playlist</h4>
      <input type="text" placeholder="Playlist Title" required v-model="title">
      <textarea required placeholder="Description" v-model="description"></textarea>
      <label>Playlist Cover</label>
      <input type="file" >
      <div class="error"></div>
      <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const title = ref('')
        const description = ref('')
        const createPlaylist = ()=>{

        }
        return { title , description , createPlaylist }
    }
}
</script>

<style scoped>
    input[type="file"]{
        border: 0;
        padding: 0;
    }
    label{
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button{
        margin-top: 20px;
    }
</style>