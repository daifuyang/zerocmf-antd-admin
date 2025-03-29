// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取客户列表 返回客户列表，支持分页 GET /api/v1/admin/customers */
export async function getCustomers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCustomersParams,
  options?: { [key: string]: any },
) {
  return request<API.CustomerListResp>('/api/v1/admin/customers', {
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

/** 创建客户 POST /api/v1/admin/customers */
export async function createCustomer(body: API.CustomerInput, options?: { [key: string]: any }) {
  return request<API.Customer>('/api/v1/admin/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单个客户 GET /api/v1/admin/customers/${param0} */
export async function getCustomerById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCustomerByIdParams,
  options?: { [key: string]: any },
) {
  const { customerId: param0, ...queryParams } = params;
  return request<API.Customer>(`/api/v1/admin/customers/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新客户 PUT /api/v1/admin/customers/${param0} */
export async function updateCustomer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCustomerParams,
  body: API.CustomerInput,
  options?: { [key: string]: any },
) {
  const { customerId: param0, ...queryParams } = params;
  return request<API.Customer>(`/api/v1/admin/customers/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除客户 DELETE /api/v1/admin/customers/${param0} */
export async function deleteCustomer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCustomerParams,
  options?: { [key: string]: any },
) {
  const { customerId: param0, ...queryParams } = params;
  return request<any>(`/api/v1/admin/customers/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
