import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from './components/TodoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TodoList,
    props: { filter: 'all' }
  },
  {
    path: '/active',
    component: TodoList,
    props: { filter: 'active' }
  },
  {
    path: '/completed',
    component: TodoList,
    props: { filter: 'completed' }
  }
]

const router = new VueRouter({
  linkActiveClass: 'selected',
  routes
})

export default router
