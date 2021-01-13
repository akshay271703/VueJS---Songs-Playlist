<template>
  <div class="user-playlist">
      <h2>Feature under construction</h2>
      <div v-if="documents">
          <h1>Nothing available here</h1>
      </div>
  </div>
</template>

<script>
import getUserPlaylist from '../../composables/getUserPlaylist.js'
import ListView from '../../components/ListView.vue'
export default {
    components : { ListView },
    setup(){
    const { documents } = getUserPlaylist('playlists')
    return { documents }
  }
}
</script>

<style scoped>
    h2 {
        padding-bottom: 10px;
        margin-bottom: 30px;
        border-bottom: 1px solid var(--secondary)
    }
    .btn {
        margin-top: 20px;
    }
</style>