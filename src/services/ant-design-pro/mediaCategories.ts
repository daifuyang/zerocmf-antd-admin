// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取媒体分类列表 返回媒体分类列表，支持分页 GET /api/v1/admin/media-categories */
export async function getMediaCategoryList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMediaCategoryListParams,
  options?: { [key: string]: any },
) {
  return request<API.MediaCategoryListResp>('/api/v1/admin/media-categories', {
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

/** 添加媒体分类 添加一个新的媒体分类 POST /api/v1/admin/media-categories */
export async function addMediaCategory(
  body: {
    /** 父分类ID */
    parentId?: number;
    /** 分类名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.MediaCategoryResp>('/api/v1/admin/media-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取媒体分类详情 根据ID获取媒体分类详情 GET /api/v1/admin/media-categories/${param0} */
export async function getMediaCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMediaCategoryParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<API.MediaCategoryResp>(`/api/v1/admin/media-categories/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改媒体分类 根据ID修改媒体分类 PUT /api/v1/admin/media-categories/${param0} */
export async function updateMediaCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMediaCategoryParams,
  body: {
    /** 父分类ID */
    parentId?: number;
    /** 分类名称 */
    name: string;
  },
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<API.MediaCategoryResp>(`/api/v1/admin/media-categories/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除媒体分类 根据ID删除媒体分类 DELETE /api/v1/admin/media-categories/${param0} */
export async function deleteMediaCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMediaCategoryParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<API.MediaCategoryResp>(`/api/v1/admin/media-categories/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取媒体分类树形结构 根据父级ID获取媒体分类的树形结构 GET /api/v1/admin/media-categories/tree */
export async function getMediaCategoryTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMediaCategoryTreeParams,
  options?: { [key: string]: any },
) {
  return request<API.MediaCategoryListResp>('/api/v1/admin/media-categories/tree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
