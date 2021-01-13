<template>
  <form @submit.prevent="handleLogIn">
      <h3>Login</h3>
      <input type="email" placeholder="email@domain.com" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <div v-if="error" class="error"> {{ error }}</div>
      <button v-if="!isPending">Log In</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter} from 'vue-router'
import useLogin from '@/composables/useLogin'
export default {
    setup(){
        const router = useRouter()
        const email = ref('')
        const password = ref('')
        const { error , login , isPending } = useLogin()

        const handleLogIn = async ()=>{
            const res = await login(email.value , password.value)
            if(!error.value){
                router.push({name : 'UserPlaylist'})
            }
        }

        return { email , password , handleLogIn , error ,isPending }
    }
}
</script>

<style>

</style>