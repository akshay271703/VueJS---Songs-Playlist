<template>
  <div class="home">
    <div class="error" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-if="documents">
      <ListView :playlists="documents"/>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import ListView from '../components/ListView.vue'
export default {
  name: 'Home',
  components : { ListView },
  setup(){
    const {error, documents} = getCollection('playlists')

    return { error , documents}
  }
}
</script>
