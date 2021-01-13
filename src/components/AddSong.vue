<template>
  <div class="add-song">
      <button v-if="!showForm" @click="showForm = !showForm">Add Songs</button>
      <form v-if="showForm" @submit.prevent="handleSubmit">
          <h4>Add a new Song</h4>
          <input type="text" placeholder="Song Name" v-model="title" required>
          <input type="text" placeholder="Artist" v-model="artist" required>
          <button>Add</button>
          <button class="closeBtn" @click="showForm = false">Close</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { updateDoc } from '../composables/useDocument.js'
import useDocument from '../composables/useDocument.js'
export default {
    props: ['playlist'],
    setup(props){
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('playlists', props.playlist.id)
        const handleSubmit = async() =>{
            const newSong = {
                title : title.value,
                artist : artist.value,
                id : Math.floor(Math.random() * 100000000)
            }
            await updateDoc({
                songs : [...props.playlist.songs , newSong]
            })
            title.value = ''
            artist.value=''
        }

        return { title , artist , showForm, handleSubmit}
    }
}
</script>

<style scoped>
    .add-song{
        text-align: center;
        margin-top: 40px;
    }
    form{
        margin-top: 40px;
        max-width: 100%;
        text-align: left;
    }
    .closeBtn{
        margin-left: 20px;
    }
</style>