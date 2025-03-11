// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取系统菜单列表 返回系统菜单列表 GET /api/v1/admin/menus */
export async function getMenus(options?: { [key: string]: any }) {
  return request<API.MenuResp>('/api/v1/admin/menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增菜单 新增一个系统菜单 POST /api/v1/admin/menus */
export async function addMenu(body: API.MenuReq, options?: { [key: string]: any }) {
  return request<API.MenuResp>('/api/v1/admin/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单个菜单 根据菜单 ID 获取系统菜单的详细信息 GET /api/v1/admin/menus/${param0} */
export async function getMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenuParams,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuResp>(`/api/v1/admin/menus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑菜单 根据菜单 ID 编辑系统菜单 PUT /api/v1/admin/menus/${param0} */
export async function updateMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMenuParams,
  body: API.MenuReq,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuResp>(`/api/v1/admin/menus/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 根据菜单 ID 删除系统菜单 DELETE /api/v1/admin/menus/${param0} */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any },
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.MenuResp>(`/api/v1/admin/menus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
