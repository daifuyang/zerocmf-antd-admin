// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取标签列表 获取文章标签列表，支持分页查询 GET /api/v1/admin/article-tags */
export async function getArticleTagList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleTagListParams,
  options?: { [key: string]: any },
) {
  return request<API.TagListResp>('/api/v1/admin/article-tags', {
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

/** 删除标签 根据标签 ID 删除指定的标签 DELETE /api/v1/article-tags/${param0} */
export async function deleteTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagParams,
  options?: { [key: string]: any },
) {
  const { tagId: param0, ...queryParams } = params;
  return request<API.TagResp>(`/api/v1/article-tags/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
