// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取系统接口列表 返回系统接口列表 GET /api/v1/admin/apis */
export async function getApis(options?: { [key: string]: any }) {
  return request<API.Response>('/api/v1/admin/apis', {
    method: 'GET',
    ...(options || {}),
  });
}
