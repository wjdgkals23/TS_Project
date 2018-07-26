import Vue from 'vue'
import Router from 'vue-router'
import User from '../components/User'
import SuperUser from '../components/SuperUser'
import DocModify from '../components/DocModify'
import DocView from '../components/DocView'
import Super from '../components/Super'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/SuperUser',
      name: 'SuperUser',
      component: Super,
      props: true,
      children: [{
        path: '/DocView/:no',
        name: 'DocView',
        component: DocView,
        props: true
      }]
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      props: true
    },
    {
      path: 'DocModify/:no',
      name: 'DocModify',
      component: DocModify,
      props: true
    }
  ]
})
