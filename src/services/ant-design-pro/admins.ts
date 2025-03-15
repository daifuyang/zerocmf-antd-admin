// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取管理员用户列表 获取管理员用户的列表，支持分页列表或全部列表，并支持通过登录名、手机号和状态进行筛选。 GET /api/v1/admin/users */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.UserListResp>('/api/v1/admin/users', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',

      ...params,
    },
    ...(options || {}),
  });
}

/** 添加管理员用户 添加新的管理员用户。 POST /api/v1/admin/users */
export async function addUser(body: API.UserSaveReq, options?: { [key: string]: any }) {
  return request<API.UserResp>('/api/v1/admin/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看管理员用户详情 通过ID获取管理员用户的详细信息。 GET /api/v1/admin/users/${param0} */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.UserResp>(`/api/v1/admin/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑管理员用户信息 通过ID编辑管理员用户信息。 PUT /api/v1/admin/users/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: API.UserSaveReq,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.UserResp>(`/api/v1/admin/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除管理员用户 通过ID删除管理员用户。 DELETE /api/v1/admin/users/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.UserResp>(`/api/v1/admin/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
