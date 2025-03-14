// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取部门列表 返回所有部门的列表数据。 GET /api/v1/admin/depts */
export async function getDeptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDeptListParams,
  options?: { [key: string]: any },
) {
  return request<API.DeptListResp>('/api/v1/admin/depts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加部门 创建一个新的部门。 POST /api/v1/admin/depts */
export async function createDept(body: API.DeptReq, options?: { [key: string]: any }) {
  return request<API.DeptResp>('/api/v1/admin/depts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取部门详情 根据ID获取部门详情。 GET /api/v1/admin/depts/${param0} */
export async function getDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDeptParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.DeptResp>(`/api/v1/admin/depts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新部门 更新指定ID的部门信息。 PUT /api/v1/admin/depts/${param0} */
export async function updateDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDeptParams,
  body: API.DeptReq,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.DeptResp>(`/api/v1/admin/depts/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除部门 删除指定ID的部门。 DELETE /api/v1/admin/depts/${param0} */
export async function deleteDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDeptParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.Response>(`/api/v1/admin/depts/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取部门树结构 返回部门的树形结构数据。 GET /api/v1/admin/depts/tree */
export async function getDeptTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDeptTreeParams,
  options?: { [key: string]: any },
) {
  return request<API.DeptTreeResp>('/api/v1/admin/depts/tree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
