import { Footer, Question, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/users';
import React from 'react';
import { App } from 'antd';
import { convertToAntdMenu } from '@/utils/menu';
import { getMenus } from './services/ant-design-pro/menus';
import _ from 'lodash';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

/**
 * 递归查找树形结构中的第一个最深子节点
 * @param {Array} nodes - 树形结构的节点数组
 * @param {Object} [startNode] - 可选的起始节点，如果未提供，则从第一个根节点开始
 * @returns {Object} - 找到的最深子节点
 */
function findFirstDeepestNode(nodes: any, startNode = null) {
  // 如果未提供起始节点，选择第一个根节点
  let currentNode: any = startNode || _.head(nodes);

  // 如果当前节点不存在，返回 null
  if (!currentNode) {
    return null;
  }

  // 如果当前节点有子节点，递归查找第一个子节点
  if (_.has(currentNode, 'children') && !_.isEmpty(currentNode.children)) {
    // 选择第一个子节点
    const firstChild: any = _.head(currentNode.children);
    return findFirstDeepestNode(currentNode.children, firstChild);
  }

  // 当前节点没有子节点，返回当前节点
  return currentNode;
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.User;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.User | undefined>;
  loginPath?: string;
  fetchMenus?: () => Promise<any[] | undefined>;
  menus?: any[];
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await queryCurrentUser({
        skipErrorHandler: true,
      });
      if (res.code === 1) {
        return res.data as API.User;
      }

    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchMenus = async () => {
    try {
      const res = await getMenus({
        skipErrorHandler: true,
      });
      if (res.code === 1) {
        return res.data as any[];
      }
    } catch (error) {
      return [];
    }
  };

  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    let menus: any = [];
    if (currentUser) {
      menus = await fetchMenus();
    }
    return {
      fetchUserInfo,
      fetchMenus,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
      loginPath,
      menus
    };
  }

  return {
    fetchUserInfo,
    fetchMenus,
    settings: defaultSettings as Partial<LayoutSettings>,
    loginPath,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar || '/assets/images/avatar.png',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    menu: {
      locale: false,
      params: initialState?.menus,
      request: async () => {
        const menus = convertToAntdMenu(initialState?.menus as any);
        return menus;
      },
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }

      // 跳转到菜单第一个菜单
      if (location.pathname === '/') {
        const menus = initialState?.menus;
        if (menus && menus.length > 0) {
          const node: any = findFirstDeepestNode(menus);
          history.push(node.path);
        }
      }

    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      console.log('childrenRender');
      return (
        <App>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </App>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};