// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取操作日志列表 分页获取操作日志列表 GET /api/v1/admin/operation-logs */
export async function getOperationLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOperationLogListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code?: number;
    msg?: string;
    data?: { data?: API.OperationLog[]; total?: number; current?: number; pageSize?: number };
  }>('/api/v1/admin/operation-logs', {
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

/** 删除操作日志 批量删除操作日志 DELETE /api/v1/admin/operation-logs */
export async function removeOperationLog(
  body: {
    ids?: number[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: number; msg?: string; data?: Record<string, any> }>(
    '/api/v1/admin/operation-logs',
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

/** 获取操作日志详情 根据ID获取操作日志详情 GET /api/v1/admin/operation-logs/${param0} */
export async function getOperationLogDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOperationLogDetailParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ code?: number; msg?: string; data?: API.OperationLog }>(
    `/api/v1/admin/operation-logs/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 清空操作日志 清空所有操作日志 DELETE /api/v1/admin/operation-logs/clean */
export async function cleanOperationLog(options?: { [key: string]: any }) {
  return request<{ code?: number; msg?: string; data?: Record<string, any> }>(
    '/api/v1/admin/operation-logs/clean',
    {
      method: 'DELETE',
      ...(options || {}),
    },
  );
}

/** 导出操作日志 导出操作日志数据 GET /api/v1/admin/operation-logs/export */
export async function exportOperationLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportOperationLogParams,
  options?: { [key: string]: any },
) {
  return request<{ code?: number; msg?: string; data?: API.OperationLog[] }>(
    '/api/v1/admin/operation-logs/export',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
