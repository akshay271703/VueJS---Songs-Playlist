<template>
<div class="navbar">
    <nav>
        <h1><router-link :to="{ name : 'Home' }">Nitro Playlist</router-link></h1>
        <div class="links">
            <div v-if="user">
                <!-- <router-link class="btn" :to="{ name : 'UserPlaylist' }">Collections</router-link> -->
                <router-link class="btn" :to="{ name : 'CreatePlaylist' }">Add Playlist</router-link>
                <button @click="handleLogout" v-if="user">Log Out</button>
            </div>
            <div v-else>
                <router-link class="btn" :to="{ name : 'Signup' }" >Sign Up</router-link>
                <router-link class="btn" :to="{ name : 'Login' }"  >Log In</router-link>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
import useLogout from '../composables/useLogout'
import User from '../composables/getUser'
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
        const { user }  = User();
        return { handleLogout , error , isPending , user}
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
    @media(max-width:700px){
        nav{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        nav .links{
            display: flex;
            justify-content: center;
            margin-left: 0;
            margin: 10px auto 0 auto;
        }
    }
</style>