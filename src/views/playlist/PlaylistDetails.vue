<template>
    <div class="error" v-if="error">
        <h2>Cannot load the current data</h2>
    </div>
    <div class="playlist-details" v-if="document">
        <div class="playlist-info">
            <div class="cover">
                <img :src="document.cover" alt="">
            </div>
            <h2>{{ document.title }}</h2>
            <p class="username">Created By {{ document.userName }}</p>
            <div class="description">
                <p>{{ document.description }}</p>
            </div>
            <button v-if="ownership" @click="deletePlaylist">Delete</button>
        </div>
        <div class="song-list">
            <div v-if="!document.songs.length">No Songs have been added yet</div>
            <div v-else>
                <div v-for="songs in document.songs" :key="songs.id" class="single-song">
                    <div class="details">
                        <h3>{{ songs.title }}</h3>
                        <p>{{ songs.artist }}</p>
                    </div>
                    <button v-if="ownership" @click="handleClick(songs.id)">Delete</button>
                </div>
            </div>
            <AddSong v-if="ownership" :playlist="document" />
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import getDocument from '../../composables/getDocument.js'
import getUser from '../../composables/getUser.js'
import useDocument from '../../composables/useDocument.js'
import useStorage from '../../composables/useStorage.js'
import { useRouter } from 'vue-router'
import AddSong from '../../components/AddSong.vue'
export default {
    components : { AddSong },
    props : ['id'],
    setup(props){
        const router = useRouter()
        const { error, document } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('playlists' , props.id)
        const { deleteImage } = useStorage()
        const ownership = computed( ()=>{
            return ( document.value && (user.value) && (user.value.uid === document.value.userID) )
        })

        const deletePlaylist = async()=>{
            await deleteImage(document.value.filePath)
            await deleteDoc()
            router.push({ name : 'Home'})
        }

        const handleClick = async (id) =>{
            let indexes = document.value.songs
            let newSongList =[]
            for(let index in indexes){
                if(document.value.songs[index].id!=id){
                    newSongList.push(document.value.songs[index])
                }
            }
            console.log(newSongList)
            await updateDoc({ songs : newSongList})
        }

        return { error, document, ownership, deletePlaylist, handleClick}
    }
}
</script>

<style scoped>
    .playlist-details {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px;
    }
    .cover {
        overflow: hidden;
        border-radius: 20px;
    }
    .cover img{
        width: 100%;
        height: 100%;
    }
    .playlist-info {
        text-align: center;
    }
    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }
    .playlist-info p {
        margin-bottom: 20px;
    }
    .username {
        color: #999;
    }
    .description {
        text-align: left;
    }
    .single-song{
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px dashed #ccc;
        margin-bottom: 20px;
    }
    @media (max-width:700px){
        .playlist-details {
            display: grid;
            grid-template-columns: 100%;
            text-align: center;
        }
    }
</style>