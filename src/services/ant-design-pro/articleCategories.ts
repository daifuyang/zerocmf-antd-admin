// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取文章分类列表 返回文章分类列表，支持分页 GET /api/v1/admin/article-categories */
export async function getArticleCategoryList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleCategoryListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/api/v1/admin/article-categories', {
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

/** 添加文章分类 添加一个新的文章分类 POST /api/v1/admin/article-categories */
export async function addArticleCategory(
  body: {
    /** 父分类ID */
    parentId?: number;
    /** 分类名称 */
    name?: string;
    /** 分类描述 */
    description?: string;
    /** 分类图标 */
    icon?: string;
    /** 排序 */
    order?: number;
    /** 状态 */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response>('/api/v1/admin/article-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章分类详情 根据ID获取文章分类详情 GET /api/v1/admin/article-categories/${param0} */
export async function getArticleCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleCategoryParams,
  options?: { [key: string]: any },
) {
  const { articleCategoryId: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/article-categories/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文章分类 根据ID修改文章分类 PUT /api/v1/admin/article-categories/${param0} */
export async function updateArticleCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateArticleCategoryParams,
  body: {
    /** 父分类ID */
    parentId?: number;
    /** 分类名称 */
    name?: string;
    /** 分类描述 */
    description?: string;
    /** 分类图标 */
    icon?: string;
    /** 排序 */
    order?: number;
    /** 状态 */
    status?: number;
  },
  options?: { [key: string]: any },
) {
  const { articleCategoryId: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/article-categories/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章分类 根据ID删除文章分类 DELETE /api/v1/admin/article-categories/${param0} */
export async function deleteArticleCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteArticleCategoryParams,
  options?: { [key: string]: any },
) {
  const { articleCategoryId: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/article-categories/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
