// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取系统菜单列表 返回系统菜单列表 GET /api/v1/admin/menus */
export async function getMenus(options?: { [key: string]: any }) {
  return request<API.Response>('/api/v1/admin/menus', {
    method: 'GET',
    ...(options || {}),
  });
}
