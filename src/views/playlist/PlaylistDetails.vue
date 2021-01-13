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
            <p>Song List Here</p>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import getDocument from '../../composables/getDocument.js'
import getUser from '../../composables/getUser.js'
import useDocument from '../../composables/useDocument.js'
export default {
    props : ['id'],
    setup(props){
        const { error, document } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { deleteDoc } = useDocument('playlists' , props.id)
        const ownership = computed( ()=>{
            return ( document.value && (user.value) && (user.value.uid === document.value.userID) )
        })

        const deletePlaylist = async()=>{
            await deleteDoc()
        }
        return { error, document, ownership, deletePlaylist}
    }
}
</script>

<style>
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
</style>