// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取医院列表 GET /api/v1/admin/hospitals */
export async function getHospitalList(options?: { [key: string]: any }) {
  return request<API.HospitalListResp>('/api/v1/admin/hospitals', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建医院 POST /api/v1/admin/hospitals */
export async function createHospital(body: API.HospitalInput, options?: { [key: string]: any }) {
  return request<API.Hospital>('/api/v1/admin/hospitals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单个医院 GET /api/v1/admin/hospitals/${param0} */
export async function getHospital(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHospitalParams,
  options?: { [key: string]: any },
) {
  const { hospitalId: param0, ...queryParams } = params;
  return request<API.Hospital>(`/api/v1/admin/hospitals/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新医院 PUT /api/v1/admin/hospitals/${param0} */
export async function updateHospital(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateHospitalParams,
  body: API.HospitalInput,
  options?: { [key: string]: any },
) {
  const { hospitalId: param0, ...queryParams } = params;
  return request<API.Hospital>(`/api/v1/admin/hospitals/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除医院 DELETE /api/v1/admin/hospitals/${param0} */
export async function deleteHospital(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteHospitalParams,
  options?: { [key: string]: any },
) {
  const { hospitalId: param0, ...queryParams } = params;
  return request<any>(`/api/v1/admin/hospitals/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
