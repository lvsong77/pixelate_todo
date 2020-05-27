import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Todo from './components/Todo'
import TodoDetail from './components/TodoDetail'


const routes = [
  {
    path: '/',
    redirect: '/todo',
  },
  {
    path: '/todo',
    component: Todo,
  },
  {
    path: '/todo/:id',
    component: TodoDetail,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router