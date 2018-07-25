import Vue from 'vue'
import Router from 'vue-router'
import User from '../components/User'
import SuperUser from '../components/SuperUser'
import DocModify from '../components/DocModify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/SuperUser',
      name: 'SuperUser',
      component: SuperUser,
      props: true,
      children: [
        {
          path: '/SuperUser/DocModify/:no',
          name: 'DocModify',
          component: DocModify,
          props: true
        }
      ]
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      props: true,
      children: [
        {
          path: ':DocModify/',
          name: 'DocModify',
          component: DocModify,
          props: true
        }
      ]
    }
  ]
})
