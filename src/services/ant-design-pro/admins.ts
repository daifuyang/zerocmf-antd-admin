// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取管理员用户列表 获取管理员用户的分页列表，支持通过登录名、手机号和状态进行筛选。 GET /api/v1/admin/users */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/api/v1/admin/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加管理员用户 添加新的管理员用户。 POST /api/v1/admin/users */
export async function addUser(
  body: {
    /** 登录名 */
    loginName: string;
    /** 邮箱地址 */
    email?: string;
    /** 手机号码 */
    phone: string;
    /** 昵称 */
    nickname?: string;
    /** 真实姓名 */
    realName?: string;
    /** 登录密码 */
    password: string;
    /** 性别，1表示男性，0表示女性 */
    gender?: 0 | 1;
    /** 出生日期（Unix 时间戳） */
    birthday?: number;
    /** 用户类型，1 表示管理员 */
    userType?: number;
    /** 用户头像URL */
    avatar?: string;
    /** 状态，0表示禁用，1表示启用 */
    status: 0 | 1;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/api/v1/admin/users', {
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
  const { id: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑管理员用户信息 通过ID编辑管理员用户信息。 POST /api/v1/admin/users/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: {
    /** 登录名 */
    loginName: string;
    /** 邮箱地址 */
    email?: string;
    /** 手机号码 */
    phone: string;
    /** 昵称 */
    nickname?: string;
    /** 真实姓名 */
    realName?: string;
    /** 登录密码 */
    password: string;
    /** 性别，1表示男性，0表示女性 */
    gender?: 0 | 1;
    /** 出生日期（Unix 时间戳） */
    birthday?: number;
    /** 用户类型，1 表示管理员 */
    userType?: number;
    /** 用户头像URL */
    avatar?: string;
    /** 状态，0表示禁用，1表示启用 */
    status: 0 | 1;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/users/${param0}`, {
    method: 'POST',
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
  const { id: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
