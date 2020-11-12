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
    name: '合同制作',
    meta: { title: '合同制作', icon: 'contract' },
    children: [
      {
        path: 'save',
        name: '合同制作',
        component: () => import('@/views/edu/contract/save'),
        meta: { title: '特许经营', icon: 'table',show:true }
      },
      {
        path: 'addBrand',
        name: '增加品牌',
        component: () => import('@/views/edu/contract/addbrand'),
        meta: { title: '增加品牌', icon: 'addoder',show:true }
      },
      {
        path: 'projectInfo/:id',
        name: '增加品牌合同信息',
        component: () => import('@/views/edu/contract/addbrand'),
        meta: { title: '增加品牌合同信息', icon: 'addoder',show:false },
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
    name: '流程列表',
    meta: { title: '流程列表', icon: 'form' },
    children: [
      {
        path:'agency',
        name: '待办事项',
        component: () => import('@/views/flow/agency'),
        meta: { title: '待办事项', icon: 'agency',show:true },
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
        path: 'abnormal',
        name: '非正常结案',
        component: () => import('@/views/flow/revocation'),
        meta: { title: '非正常结案', icon: 'all',show:true }
      },
      // {
      //   path: 'index',
      //   name: '所有流程',
      //   component: () => import('@/views/flow/index'),
      //   meta: { title: '所有流程', icon: 'all',show:true },
      // },
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
    path: '/case',
    component: Layout,
    redirect: '/case/end',
    name: '案件列表',
    meta: { title: '案件列表', icon: 'form' },
    children: [
      {
        path:'end',
        name: '已结案',
        component: () => import('@/views/case/index'),
        meta: { title: '已结案', icon: 'agency',show:true},
      },
      {
        path:'unfinished',
        name: '未结案',
        component: () => import('@/views/case/index'),
        meta: { title: '未结案', icon: 'closeout',show:true },
      },
      {
        path:'unpayment',
        name: '已结案未付款',
        component: () => import('@/views/case/index'),
        meta: { title: '已结案未付款', icon: 'revocation',show:true },
      },
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    redirect: '/invoice/signed',
    name: '开票列表',
    meta: { title: '开票列表', icon: 'form' },
    children: [
      {
        path:'signed',
        name: '已签订合同',
        component: () => import('@/views/invoice/index'),
        meta: { title: '已签订合同', icon: 'agency',show:true},
      },
      {
        path:'registered',
        name: '已立案合同',
        component: () => import('@/views/invoice/index'),
        meta: { title: '已立案合同', icon: 'agency',show:true},
      },
      {
        path:'make',
        name: '发票开取',
        component: () => import('@/views/invoice/makeInvoice'),
        meta: { title: '发票开取', icon: 'agency',show:false},
        hidden:true
      },
    ]
  },
  {
    path: '/history',
    component: Layout,
    redirect: '/history/invoice',
    name: '历史记录',
    meta: { title: '历史记录', icon: 'form' },
    children: [
      {
        path:'invoice',
        name: '开票记录',
        component: () => import('@/views/history/invoice'),
        meta: { title: '开票记录', icon: 'agency',show:true},
      },
      {
        path:'mail',
        name: '邮寄记录',
        component: () => import('@/views/invoice/index'),
        meta: { title: '邮寄记录', icon: 'agency',show:true},
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
