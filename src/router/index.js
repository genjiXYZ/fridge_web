import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import FoodList from '../components/Foods_list.vue'
Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/home"
  },


  {
    path: "/home",
    name: 'Home',
    component: Home,
    meta: {
      index: 0
    },
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      Login: () => import('../views/Login.vue')
    }
  },
  {
    path: '/add',
    name: 'Add',
    meta: {
      index: -1
    },
    component: () => import('../views/Add.vue'),
    children: [
      {
      path:"/add",
      name: 'Add',
      component:()=> import('../components/Add_categorys.vue'),
     
      },
      {
        path: '/add/:category',
        component: () => import('../components/Add_select.vue'),
        name: 'Add',
        props: true,
      }
    ]
  },
  {
    path: '/foods/:position',
    name: 'Foods',
    props: true,

    meta: {
      index: 1
    },
    component: () => import('../views/Foods.vue'),
    children: [{
      path: '/fresher',
      component: FoodList
    }]
  },
  {
    path: '/foods',
    redirect: '/foods/fresher'
  }

]

const router = new VueRouter({
  routes
})

export default router