// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取字典数据列表 GET /api/v1/admin/dict/data */
export async function getDictDataList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictDataListParams,
  options?: { [key: string]: any },
) {
  return request<API.DictDataListResp>('/api/v1/admin/dict/data', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建字典数据 POST /api/v1/admin/dict/data */
export async function createDictData(body: API.DictDataCreate, options?: { [key: string]: any }) {
  return request<API.DictDataResp>('/api/v1/admin/dict/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除字典数据 DELETE /api/v1/admin/dict/data */
export async function deleteDictDataBatch(
  body: {
    /** 字典数据编码列表 */
    dictCodes: number[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/api/v1/admin/dict/data', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取字典数据详情 GET /api/v1/admin/dict/data/${param0} */
export async function getDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictDataParams,
  options?: { [key: string]: any },
) {
  const { dictCode: param0, ...queryParams } = params;
  return request<any>(`/api/v1/admin/dict/data/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新字典数据 PUT /api/v1/admin/dict/data/${param0} */
export async function updateDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDictDataParams,
  body: API.DictDataUpdate,
  options?: { [key: string]: any },
) {
  const { dictCode: param0, ...queryParams } = params;
  return request<API.DictDataResp>(`/api/v1/admin/dict/data/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典数据 DELETE /api/v1/admin/dict/data/${param0} */
export async function deleteDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDictDataParams,
  options?: { [key: string]: any },
) {
  const { dictCode: param0, ...queryParams } = params;
  return request<API.DictDataResp>(`/api/v1/admin/dict/data/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除字典数据 POST /api/v1/admin/dict/data/batchDelete */
export async function batchDeleteDictData(
  body: {
    /** 字典数据编码列表 */
    dictCodes: number[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/api/v1/admin/dict/data/batchDelete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
