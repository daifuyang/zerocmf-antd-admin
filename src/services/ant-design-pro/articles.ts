// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取文章列表 返回文章列表，支持分页 GET /api/v1/admin/articles */
export async function getArticleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleListParams,
  options?: { [key: string]: any },
) {
  return request<API.ArticleListResp>('/api/v1/admin/articles', {
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

/** 创建文章 创建一篇新的文章 POST /api/v1/admin/articles */
export async function createArticle(
  body: {
    /** 分类ID列表 */
    categoryIds?: number[];
    /** 文章标题 */
    title?: string;
    /** 文章内容 */
    content?: string;
    /** 文章摘要 */
    excerpt?: string;
    /** 文章关键词 */
    keywords?: string[];
    /** 发布时间 */
    publishedAt?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ArticleResp>('/api/v1/admin/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章详情 根据ID获取文章详情 GET /api/v1/admin/articles/${param0} */
export async function getArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleParams,
  options?: { [key: string]: any },
) {
  const { articleId: param0, ...queryParams } = params;
  return request<API.ArticleResp>(`/api/v1/admin/articles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新文章 根据ID更新文章 PUT /api/v1/admin/articles/${param0} */
export async function updateArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateArticleParams,
  body: {
    /** 分类ID列表 */
    categoryIds?: number[];
    /** 文章标题 */
    title?: string;
    /** 文章内容 */
    content?: string;
    /** 文章摘要 */
    excerpt?: string;
    /** 文章关键词 */
    keywords?: string[];
    /** 发布时间 */
    publishedAt?: string;
  },
  options?: { [key: string]: any },
) {
  const { articleId: param0, ...queryParams } = params;
  return request<API.ArticleResp>(`/api/v1/admin/articles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章 根据ID删除文章 DELETE /api/v1/admin/articles/${param0} */
export async function deleteArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteArticleParams,
  options?: { [key: string]: any },
) {
  const { articleId: param0, ...queryParams } = params;
  return request<API.ArticleResp>(`/api/v1/admin/articles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
