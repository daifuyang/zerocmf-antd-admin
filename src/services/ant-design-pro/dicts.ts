// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取字典类型列表 GET /api/v1/admin/dict/types */
export async function getDictTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictTypeListParams,
  options?: { [key: string]: any },
) {
  return request<API.DictTypeListResp>('/api/v1/admin/dict/types', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建字典类型 POST /api/v1/admin/dict/types */
export async function createDictType(body: API.DictTypeCreate, options?: { [key: string]: any }) {
  return request<API.DictDataResp>('/api/v1/admin/dict/types', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取字典类型详情 GET /api/v1/admin/dict/types/${param0} */
export async function getDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictTypeParams,
  options?: { [key: string]: any },
) {
  const { dictId: param0, ...queryParams } = params;
  return request<API.DictDataResp>(`/api/v1/admin/dict/types/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新字典类型 PUT /api/v1/admin/dict/types/${param0} */
export async function updateDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDictTypeParams,
  body: API.DictTypeUpdate,
  options?: { [key: string]: any },
) {
  const { dictId: param0, ...queryParams } = params;
  return request<API.DictDataResp>(`/api/v1/admin/dict/types/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典类型 DELETE /api/v1/admin/dict/types/${param0} */
export async function deleteDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDictTypeParams,
  options?: { [key: string]: any },
) {
  const { dictId: param0, ...queryParams } = params;
  return request<API.DictDataResp>(`/api/v1/admin/dict/types/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
