// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取登录日志列表 分页获取登录日志列表 GET /api/v1/admin/login-logs */
export async function getLoginLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLoginLogListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code?: number;
    msg?: string;
    data?: { list?: API.LoginLog[]; total?: number; current?: number; pageSize?: number };
  }>('/api/v1/admin/login-logs', {
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

/** 删除登录日志 批量删除登录日志 DELETE /api/v1/admin/login-logs */
export async function removeLoginLog(
  body: {
    ids?: number[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: number; msg?: string; data?: Record<string, any> }>(
    '/api/v1/admin/login-logs',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取登录日志详情 根据ID获取登录日志详情 GET /api/v1/admin/login-logs/${param0} */
export async function getLoginLogDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLoginLogDetailParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ code?: number; msg?: string; data?: API.LoginLog }>(
    `/api/v1/admin/login-logs/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 清空登录日志 清空所有登录日志 DELETE /api/v1/admin/login-logs/clean */
export async function cleanLoginLog(options?: { [key: string]: any }) {
  return request<{ code?: number; msg?: string; data?: Record<string, any> }>(
    '/api/v1/admin/login-logs/clean',
    {
      method: 'DELETE',
      ...(options || {}),
    },
  );
}

/** 导出登录日志 导出登录日志数据 GET /api/v1/admin/login-logs/export */
export async function exportLoginLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportLoginLogParams,
  options?: { [key: string]: any },
) {
  return request<{ code?: number; msg?: string; data?: API.LoginLog[] }>(
    '/api/v1/admin/login-logs/export',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
