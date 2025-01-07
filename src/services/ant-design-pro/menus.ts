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

/** 获取单个菜单 根据菜单 ID 获取系统菜单的详细信息 GET /api/v1/admin/menus/${param0} */
export async function getMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenuParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/menus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
