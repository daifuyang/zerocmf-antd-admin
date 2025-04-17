// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取媒体资源列表 返回媒体资源的分页列表。 GET /api/v1/admin/medias */
export async function getMedias(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMediasParams,
  options?: { [key: string]: any },
) {
  return request<API.MediaListResp>('/api/v1/admin/medias', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加媒体资源 添加一个新的媒体资源。 POST /api/v1/admin/medias */
export async function addMedia(
  body: {
    /** 文件类型，例如 image 或 video */
    type?: string;
    /** 媒体资源分类ID */
    categoryId?: number;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.MediaResp>('/api/v1/admin/medias', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取单个媒体资源 根据id获取单个媒体资源 GET /api/v1/admin/medias/${param0} */
export async function getMedia(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMediaParams,
  options?: { [key: string]: any },
) {
  const { mediaId: param0, ...queryParams } = params;
  return request<API.MediaResp>(`/api/v1/admin/medias/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新媒体资源备注名称 更新指定id的媒体资源备注名称(remarkName)，不修改实际文件 PUT /api/v1/admin/medias/${param0} */
export async function updateMedia(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMediaParams,
  body: {
    /** 新的备注名称 */
    remarkName: string;
  },
  options?: { [key: string]: any },
) {
  const { mediaId: param0, ...queryParams } = params;
  return request<API.MediaResp>(`/api/v1/admin/medias/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除媒体资源 删除指定id的媒体资源 DELETE /api/v1/admin/medias/${param0} */
export async function deleteMedia(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMediaParams,
  options?: { [key: string]: any },
) {
  const { mediaId: param0, ...queryParams } = params;
  return request<API.MediaResp>(`/api/v1/admin/medias/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
