import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../views/Login.vue'
import SignUpPage from '../views/SignUp.vue'
import HomePage from '../views/Home.vue'
import Index from '../views/Index.vue'
import CommentPage from '../views/Comment.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/post/comments',
    name: 'comment',
    component: CommentPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
