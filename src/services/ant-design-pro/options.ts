// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取配置项值 根据配置项名称获取其值。 GET /api/v1/admin/options/${param0} */
export async function getOptionValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOptionValueParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.optionResp>(`/api/v1/admin/options/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 设置配置项值 根据配置项名称设置其值。 POST /api/v1/admin/options/${param0} */
export async function setOptionValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setOptionValueParams,
  body: {
    /** 配置项名称 */
    name?: string;
    /** 配置项值 */
    value?: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.optionResp>(`/api/v1/admin/options/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
