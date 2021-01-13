<template>
  <div class="navbar">
      <nav>
          <h1><router-link :to="{ name : 'Home' }">D3 Playlist</router-link></h1>
          <div class="links">
              <button @click="handleLogout">Log Out</button>
              <router-link class="btn" :to="{ name : 'Signup' }">Sign Up</router-link>
              <router-link class="btn" :to="{ name : 'Login' }">Log In</router-link>
          </div>
      </nav>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const router = useRouter()
        const { error, logout ,isPending } = useLogout();
        const handleLogout = async ()=>{
            await logout()
            console.log('User Logged out')
            router.push({ name : 'Login'})
        }

        return { handleLogout , error , isPending}
    }
}
</script>

<style scoped>
    .navbar{
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }
    nav{
        display: flex;
        max-width: 1200px;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
    }
    nav h1{
        margin-left: 20px;
    }
    nav .links{
        margin-left: auto;
    }
    nav .links a, button{
        margin-left: 16px;
        font-size: 14px;
    }
</style>