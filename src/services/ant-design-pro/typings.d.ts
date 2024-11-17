declare namespace API {
  type deleteRoleParams = {
    id: number;
  };

  type deleteUserParams = {
    /** 管理员用户的ID */
    id: number;
  };

  type getRoleParams = {
    /** 角色唯一标识符 */
    id: number;
  };

  type getRolesParams = {
    /** 当前页 */
    page?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 角色状态 */
    status?: number;
  };

  type getUserParams = {
    /** 管理员用户的ID */
    id: number;
  };

  type getUsersParams = {
    /** 当前页 */
    page?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 通过登录名筛选 */
    loginName?: string;
    /** 通过手机号筛选 */
    phone?: string;
    /** 通过状态筛选，0表示禁用，1表示启用 */
    status?: 0 | 1;
  };

  type LoginReq = {
    /** 用户的账号，可以是邮箱、手机号或用户名 */
    account: string;
    /** 用户的登录密码，使用密码登录时必须提供 */
    password: string;
    loginType?: LoginType;
    /** 手机登录类型，当使用手机号登录时可以选择 'sms' 短信验证码登录 */
    phoneType?: 'sms' | 'password';
  };

  type LoginType = 'email' | 'phone' | 'account';

  type Response = {
    /** Response code */
    code: number;
    /** Response message */
    msg: string;
    data?: Record<string, any> | Record<string, any>[] | string | number | boolean;
  };

  type Role = {
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 排序值 */
    sort?: number;
    /** 角色状态，1表示启用，0表示禁用 */
    status?: number;
  };

  type securitySchemes = Record<string, any>;

  type TokenData = {
    /** JWT 访问令牌 */
    accessToken: string;
    /** 访问令牌过期时间 */
    expiresAt: number;
    /** 刷新令牌 */
    refreshToken: string;
    /** 刷新令牌过期时间 */
    reExpiresAt: number;
  };

  type UnAuthorized = {
    /** Response message */
    msg: string;
  };

  type updateRoleParams = {
    /** 角色唯一标识符 */
    id: number;
  };

  type updateUserParams = {
    /** 管理员用户的ID */
    id: number;
  };

  type User = {
    /** 用户ID */
    id: number;
    /** 登录名 */
    loginName: string;
    /** 邮箱地址，可以为空 */
    email?: string;
    /** 手机号，可以为空 */
    phone?: string;
    /** 昵称 */
    nickname?: string;
    /** 真实姓名，可以为空 */
    realName?: string;
    /** 性别 (0: 未知, 1: 男, 2: 女) */
    gender: number;
    /** 生日，可以为空 */
    birthday?: string;
    /** 用户类型 */
    userType: number;
    /** 名字，可以为空 */
    name?: string;
    /** 头像URL，可以为空 */
    avatar?: string;
    /** 最后登录IP，可以为空 */
    loginIp?: string;
    /** 最后登录时间，可以为空 */
    loginTime?: string;
    /** 用户状态 */
    status: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
  };
}
