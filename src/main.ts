import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import Passwords from './pages/Passwords.vue'
import Notes from './pages/Notes.vue'
import Books from './pages/Books.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/passwords', component: Passwords },
  { path: '/notes', component: Notes },
  { path: '/books', component: Books },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')