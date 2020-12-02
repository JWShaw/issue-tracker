import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/projects/:projId',
    name: 'Project',
    component: () => import('../views/Project.vue')
  },
  {
    path: '/projects/:projId/issues/:issueId',
    name: 'Issue',
    component: () => import('../views/Issue.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/createproject',
    name: 'Create Project',
    component: () => import('../views/CreateProject.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/:projId/createissue',
    name: 'Create Issue',
    component: () => import('../views/CreateIssue.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
  }
  next()
})

export default router

