// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Create a dispatch Creates a new dispatch record POST /api/v1/admin/dispatch */
export async function createDispatch(options?: { [key: string]: any }) {
  return request<any>('/api/v1/admin/dispatch', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get dispatch by ID Returns a single dispatch record GET /api/v1/admin/dispatch/${param0} */
export async function getDispatchById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDispatchByIdParams,
  options?: { [key: string]: any },
) {
  const { dispatchId: param0, ...queryParams } = params;
  return request<any>(`/api/v1/admin/dispatch/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update a dispatch Updates an existing dispatch record PUT /api/v1/admin/dispatch/${param0} */
export async function updateDispatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDispatchParams,
  options?: { [key: string]: any },
) {
  const { dispatchId: param0, ...queryParams } = params;
  return request<any>(`/api/v1/admin/dispatch/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete a dispatch Deletes a dispatch record DELETE /api/v1/admin/dispatch/${param0} */
export async function deleteDispatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDispatchParams,
  options?: { [key: string]: any },
) {
  const { dispatchId: param0, ...queryParams } = params;
  return request<any>(`/api/v1/admin/dispatch/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get dispatch list Returns a paginated list of dispatch records GET /api/v1/admin/dispatch/list */
export async function getDispatches(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDispatchesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/admin/dispatch/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
