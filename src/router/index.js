import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { show:true}
    }]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/register',
    name: '账号管理',
    meta: { title: '账号管理', icon: 'example' },
    children: [
      {
        path: 'register',
        name: '账号注册',
        component: () => import('@/views/account/register'),
        meta: { title: '账号注册', icon: 'user' ,show:true}
      },
      {
        path: 'change/:id',
        name: '业务转移',
        component: () => import('@/views/account/change'),
        meta: { title: '业务转移', icon: 'user' ,show:false},
        hidden:true
      },
      {
        path: 'list',
        name: '账号列表',
        component: () => import('@/views/account/list'),
        meta: { title: '账号列表', icon: 'tree' ,show:true}
      },
      {
        path: 'userset',
        name: '用户修改',
        component: () => import('@/views/account/userset.vue'),
        meta: { title: '用户修改', icon: 'password',show:true }
      },
      {
        path: 'set/:id',
        name: '修改账号',
        component: () => import('@/views/account/set.vue'),
        meta: { title: '修改账号', noCache:true,show:true },
        hidden:true
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/save',
    name: '合同',
    meta: { title: '合同', icon: 'contract' },
    children: [
      {
        path: 'save',
        name: '合同制作',
        component: () => import('@/views/edu/contract/save'),
        meta: { title: '合同制作', icon: 'table',show:true }
      },
      {
        path: 'addBrand',
        name: '增加品牌',
        component: () => import('@/views/edu/contract/addbrand'),
        meta: { title: '增加品牌', icon: 'addoder',show:true }
      },
      {
        path: 'projectInfo/:id',
        name: '合同信息',
        component: () => import('@/views/edu/contract/addbrand'),
        meta: { title: '合同信息', icon: 'addoder',show:false },
        hidden:true
      },
      {
        path: 'info/:id',
        name: '合同信息',
        component: () => import('@/views/edu/contract/save'),
        meta: { title: '合同信息', icon: 'form',show:false },
        hidden:true
      },
     
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/list',
    name: '审核',
    meta: { title: '审核', icon: 'example' },
    children: [
      {
        path: 'schedule',
        name: '审核进度',
        component: () => import('@/views/edu/audit/schedule'),
        meta: { title: '审核进度', icon: 'table',show:3},
        hidden: true
      },
      { 
        path: 'list',
        name: '合同列表',
        component: () => import('@/views/edu/audit/list'),
        meta: { title: '合同列表', icon: 'tree',show:true},
      },
      {
        path: 'list/:id',
        name: '合同待办',
        component: () => import('@/views/edu/audit/list'),
        meta: { title: '合同待办', icon: 'form',show:true},
        hidden:true
      },
      { 
        path: 'update',
        name: '合同修改',
        component: () => import('@/views/edu/audit/update'),
        meta: { title: '合同修改', icon: 'tree',show:true},
        hidden: true
      },
      { 
        path: 'audit',
        name: '合同审核',
        component: () => import('@/views/edu/audit/update'),
        meta: { title: '合同审核', icon: 'tree',show:true},
        hidden: true
      },
      { 
        path: 'sign',
        name: '合同签订',
        component: () => import('@/views/edu/audit/sign'),
        meta: { title: '合同签订', icon: 'tree',show:false},
        hidden: true
      },
      { 
        path: 'updatepro',
        name: '增加品牌合同修改',
        component: () => import('@/views/edu/audit/updatepro'),
        meta: { title: '增加品牌合同修改', icon: 'tree',show:true},
        hidden: true
      },
      { 
        path: 'auditpro',
        name: '增加品牌合同审核',
        component: () => import('@/views/edu/audit/updatepro'),
        meta: { title: '增加品牌合同审核', icon: 'tree',show:true},
        hidden: true
      },
    ]
  },
  {
    path: '/flow',
    component: Layout,
    redirect: '/flow/agency',
    name: '流程',
    meta: { title: '流程', icon: 'form' },
    children: [
      {
        path:'agency',
        name: '代办事项',
        component: () => import('@/views/flow/agency'),
        meta: { title: '代办事项', icon: 'agency',show:true },
      },
      {
        path:'closeout',
        name: '结案流程',
        component: () => import('@/views/flow/closeout'),
        meta: { title: '结案流程', icon: 'closeout',show:true },
      },
      {
        path:'revocation',
        name: '流程撤案',
        component: () => import('@/views/flow/revocation'),
        meta: { title: '流程撤案', icon: 'revocation',show:true },
      },
      {
        path:'revocationOperation/:id',
        name: '撤案操作',
        component: () => import('@/views/flow/revocationOperation'),
        meta: { title: '流程操作', icon: 'revocation',show:false },
        hidden:true
      },
      {
        path: 'index/:id',
        name: '流程待办',
        component: () => import('@/views/flow/index'),
        meta: { title: '流程待办', icon: 'form',show:true },
        hidden:true
      },
      {
        path: 'index',
        name: '所有流程',
        component: () => import('@/views/flow/index'),
        meta: { title: '所有流程', icon: 'all',show:true }
      },
      {
        path: 'operation/:id',
        name: '流程操作',
        component: () => import('@/views/flow/operation'),
        meta: { title: '流程操作', icon: 'form',show:false },
        hidden:true
      },
      {
        path: 'record/:id',
        name: '流程进度',
        component: () => import('@/views/flow/record'),
        meta: { title: '流程操作', icon: 'form',show:3},
        hidden:true
      },
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'message',
        name: '消息中心',
        component: () => import('@/views/message/message'),
        meta: { title: '消息中心', icon: 'nested',show:true}
      }
    ]
  },
  {
    path: '/unreviewed',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'unreviewed',
        name: '代办事项',
        component: () => import('@/views/unreviewed/unreviewed'),
        meta: { title: '代办事项', icon: 'nested',show:true},
        hidden:true
      }
    ]
  },
  {
    path: '/tools',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '小工具',
        component: () => import('@/views/tool/tool'),
        meta: { title: '小工具', icon: 'tool',show:true }
      },
    ]
  },
  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
