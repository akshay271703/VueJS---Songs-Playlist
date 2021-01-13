<template>
  <form @submit.prevent="createPlaylist">
      <h4>Create New Playlist</h4>
      <input type="text" placeholder="Playlist Title" required v-model="title">
      <textarea required placeholder="Description" v-model="description"></textarea>
      <label>Playlist Cover</label>
      <input type="file" @change="handleChange">
      <div class="error" v-if="fileError">{{ fileError }}</div>
      <button v-if="!isPending">Create</button>
      <button v-if="isPending" disabled>Uploading</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '../../../data/firebase/config'

export default {
    setup(){
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const { url, filePath, fileUpload} = useStorage()
        const { error , addDoc } = useCollection('playlists')
        const { user } = getUser()
        const isPending = ref(false)
        const createPlaylist = async ()=>{
            if(file.value){
                isPending.value = true
                await fileUpload(file.value)
                await addDoc({
                    title : title.value,
                    description : description.value,
                    cover : url.value,
                    userID : user.value.uid,
                    userName : user.value.displayName,
                    filePath : filePath.value,
                    songs : [],
                    createdAt : timestamp()
                })
                isPending.value = false
            }
        }

        const handleChange = (e)=>{
            const selected = e.target.files[0]
            if(selected && selected.type.includes('image') ){
                file.value = selected
                fileError.value = null
            }else{
                file.value = null
                fileError.value = 'Select an Image Type'
            }
        }
        return { title , description , createPlaylist , handleChange ,fileError , isPending }
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