import Vue from 'vue'
import Router from 'vue-router'
import User from '../components/User'
import SuperUser from '../components/Empty'
import DocModify from '../components/DocModify'
import DocView from '../components/DocView'
import Super from '../components/Super'
import Empty from '../components/Empty'
import DocAdd from '../components/DocAdd'
import DocDistribute from '../components/DocDistribute'

import App from '../App2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Empty',
      component: Empty,
      props: true
    },
    {
      path: '/superuser',
      name: 'SuperUser',
      component: Super,
      props: true,
      children: [{
        path: '/superuser/doc/:no',
        name: 'DocView',
        component: DocView,
        props: true
      }]
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      props: true,
      children: [{
        path: '/user/doc/:no',
        name: 'UserDocView',
        component: DocView,
        props: true
      }]
    },
    {
      path: '/superuser/doc/:no',
      name: 'DocModify',
      component: DocModify,
      props: true
    },
    {
      path: '/superuser/new',
      name: 'DocAdd',
      component: DocAdd,
      props: true
    },
    {
      path: '/superuser/doc/:no',
      name: 'DocDistribute',
      component: DocDistribute,
      props: true
    }
  ]
})
