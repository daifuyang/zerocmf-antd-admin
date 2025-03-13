import component from "@/locales/bn-BD/component";

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    name: 'login',
    path: '/login',
    layout: false,
    component: './User/Login',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [
      {
        path: '/user',
        redirect: '/user/admin',
      },
      {
        name: 'admin',
        path: '/user/admin',
        routes: [
          {
            path: '/user/admin',
            redirect: '/user/admin/list',
          },
          {
            name: 'list',
            path: '/user/admin/list',
            component: './User/Admin',
            hideInMenu: true,
          },
          {
            name: 'add',
            path: '/user/admin/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/user/admin/edit/:id',
            hideInMenu: true,
          },
          {
            name: 'delete',
            path: '/user/admin/delete/:id',
            hideInMenu: true,
          },
        ],
      },
      {
        name: 'role',
        path: '/user/role',
        routes: [
          {
            path: '/user/role',
            redirect: '/user/role/list',
          },
          {
            name: 'list',
            path: '/user/role/list',
            component: './User/Role',
            hideInMenu: true,
          },
          {
            name: 'add',
            path: '/user/role/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/user/role/edit',
            hideInMenu: true,
          },
          {
            name: 'delete',
            path: '/user/role/delete',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        name: 'menu',
        path: '/system/menu',
        routes: [
          {
            path: '/system/menu',
            redirect: '/system/menu/list',
          },
          {
            name: 'list',
            path: '/system/menu/list',
            component: './System/Menu',
            hideInMenu: true,
          },
          {
            name: 'add',
            path: '/system/menu/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/system/menu/edit',
            hideInMenu: true,
          },
          {
            name: 'delete',
            path: '/system/menu/delete',
            hideInMenu: true,
          },
        ],
      },
      {
        name: 'dept',
        path: '/system/dept',
        routes: [
          {
            path: '/system/dept',
            redirect: '/system/dept/list',
          },
          {
            name: 'list',
            path: '/system/dept/list',
            component: './System/Dept',
            hideInMenu: true,
          },
          {
            name: 'add',
            path: '/system/dept/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/system/dept/edit',
            hideInMenu: true,
          },
          {
            name: 'delete',
            path: '/system/dept/delete',
            hideInMenu: true,
          },
        ],
      },
      {
        name: 'post',
        path: '/system/post',
        routes: [
          {
            path: '/system/post',
            redirect: '/system/post/list',
          },
          {
            name: 'list',
            path: '/system/post/list',
            component: './System/Post',
            hideInMenu: true,
          },
          {
            name: 'add',
            path: '/system/post/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/system/post/edit',
            hideInMenu: true,
          },
          {
            name: 'delete',
            path: '/system/post/delete',
            hideInMenu: true,
          },
        ],
      },
      {
        name: 'upload',
        path: '/system/upload',
        component: './System/Upload',
      },
      {
        name: 'media',
        path: '/system/media',
        routes: [
          {
            path: '/system/media',
            redirect: '/system/media/list',
          },
          {
            name: 'list',
            path: '/system/media/list',
            component: './System/Media',
            hideInMenu: true,
          },
        ]
      },
      {
        name: 'dict',
        path: '/system/dict',
        routes: [
          {
            path: '/system/dict',
            redirect: '/system/dict/list',
          },
          {
            name: 'list',
            path: '/system/dict/list',
            component: './System/Dict',
            hideInMenu: true,
          },
          {
            name: 'add',
            path: '/system/dict/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/system/dict/edit',
            hideInMenu: true,
          },
          {
            name: 'delete',
            path: '/system/dict/delete',
            hideInMenu: true,
          },
        ],
      },
      {
        name: 'log',
        path: '/system/log',
      },
    ],
  },
  {
    path: '/article',
    name: 'article',
    icon: 'article',
    routes: [
      {
        path: '/article',
        redirect: '/article/list',
      },
      {
        name: 'list',
        path: '/article/list',
        component: './Article/list',
      },
      {
        name: 'articleCategory',
        path: '/article/category',
        component: './Article/category',
      },
      {
        name: 'articleTag',
        path: '/article/tag',
        component: './Article/tag',
      }
    ],
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
