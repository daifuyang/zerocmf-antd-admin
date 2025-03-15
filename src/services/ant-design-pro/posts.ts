// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取岗位列表 返回所有岗位的列表数据。 GET /api/v1/admin/posts */
export async function getPostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostListParams,
  options?: { [key: string]: any },
) {
  return request<API.PostListResp>('/api/v1/admin/posts', {
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

/** 添加岗位 创建一个新的岗位。 POST /api/v1/admin/posts */
export async function createPost(body: API.PostReq, options?: { [key: string]: any }) {
  return request<API.PostResp>('/api/v1/admin/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取岗位详情 根据ID获取岗位详情。 GET /api/v1/admin/posts/${param0} */
export async function getPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostParams,
  options?: { [key: string]: any },
) {
  const { postId: param0, ...queryParams } = params;
  return request<API.PostResp>(`/api/v1/admin/posts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新岗位 更新指定ID的岗位信息。 PUT /api/v1/admin/posts/${param0} */
export async function updatePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePostParams,
  body: API.PostReq,
  options?: { [key: string]: any },
) {
  const { postId: param0, ...queryParams } = params;
  return request<API.PostResp>(`/api/v1/admin/posts/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除岗位 删除指定ID的岗位。 DELETE /api/v1/admin/posts/${param0} */
export async function deletePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePostParams,
  options?: { [key: string]: any },
) {
  const { postId: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/posts/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
