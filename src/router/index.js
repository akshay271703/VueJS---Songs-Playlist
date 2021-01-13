import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlist/CreatePlaylist.vue'
import PlaylistDetails from '../views/playlist/PlaylistDetails.vue'
import UserPlaylist from '../views/playlist/UserPlaylist.vue'

//Route Guard

import { projectAuth } from '../../data/firebase/config'
const requireAuth = (to, from ,next) =>{
  let user = projectAuth.currentUser
  if(!user){
    next({ name : 'Login'})
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter : requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter : requireAuth
  },
  {
    path: '/playlist/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    beforeEnter : requireAuth,
    props : true
  },
  {
    path: '/playlist/user',
    name: 'UserPlaylist',
    component: UserPlaylist,
    beforeEnter : requireAuth,
    props : true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
