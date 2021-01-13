<template>
<div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name : 'PlaylistDetails', params : { id : playlist.id }}">
    <div class="single">
        <div class="thumbnail">
            <img :src="playlist.cover" alt="">
        </div>
        <div class="info">
            <h3>{{ playlist.title }}</h3>
            <p> Created By {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
            <p>{{ playlist.songs.length }} Songs</p>
        </div>
    </div>
    </router-link>
</div>
</template>

<script>
export default {
    props : ['playlists']
}
</script>

<style scoped>
    .single{
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background: white;
        margin: 16px 0;
        transition: all 0.2s ease;
        cursor: pointer;
    }
    .single:hover{
        box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.5);
        transform: scale(1.02);
        transition: all 0.2s ease;
    }
    .thumbnail{
        max-width: 100px;
        max-height: 100px;
        overflow: hidden;
        border-radius: 10px;
    }
    img{
        max-width: 120%;
        max-height: 120%;
        display: block;
    }
    .info{
        margin: 0 30px;
    }
    .song-number{
        margin-left: auto;
    }
</style>