<template>
  <form @click="handleSignUp">
      <h3>Sign Up</h3>
      <input type="text" placeholder="Display Name" v-model="displayName">
      <input type="email" placeholder="email@domain.com" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <button v-if="!isPending">Sign Up</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter} from 'vue-router'
export default {
    setup(){
        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const { error, signup , isPending} = useSignup()

        const handleSignUp = async()=>{
            const res = await signup(email.value , password.value , displayName.value)
            if(!error.value){
                router.push({name : 'UserPlaylist'})
            }
        }
        return { displayName , email , password , error , isPending , handleSignUp }
    }
}
</script>

<style>

</style>