<template>
  <div class="home">
    <div class="error" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">
        {{doc.title}}
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
export default {
  name: 'Home',
  setup(){
    const {error, documents} = getCollection('playlists')

    return { error , documents}
  }
}
</script>
