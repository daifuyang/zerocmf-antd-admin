declare namespace API {
  type Api = {
    /** API ID */
    id?: number;
    /** API 路径 */
    path?: string;
    /** HTTP 方法 */
    method?: string;
    /** API 描述 */
    description?: string;
    /** API 分组 */
    group?: string;
  };

  type ApiResponse =
    // #/components/schemas/Response
    Response & {
      data?: Api;
    };

  type deleteArticleCategoryParams = {
    /** 文章分类ID */
    articleCategoryId: number;
  };

  type deleteArticleParams = {
    /** 文章ID */
    articleId: number;
  };

  type deleteMediaParams = {
    mediaId: number;
  };

  type deleteMenuParams = {
    /** 菜单的 ID */
    menuId: number;
  };

  type deleteRoleParams = {
    roleId: number;
  };

  type deleteTagParams = {
    /** 标签 ID */
    tagId: number;
  };

  type deleteUserParams = {
    /** 管理员用户的ID */
    userId: number;
  };

  type getArticleCategoryListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 是否返回树形结构 */
    isTree?: any;
  };

  type getArticleCategoryParams = {
    /** 文章分类ID */
    articleCategoryId: number;
  };

  type getArticleListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页条数 */
    pageSize?: number;
  };

  type getArticleParams = {
    /** 文章ID */
    articleId: number;
  };

  type getArticleTagListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页显示的记录数 */
    pageSize?: number;
  };

  type getMediaParams = {
    /** 媒体资源唯一标识符 */
    mediaId: number;
  };

  type getMediasParams = {
    /** 当前页 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
  };

  type getMenuParams = {
    /** 菜单的 ID */
    menuId: number;
  };

  type getOptionValueParams = {
    /** 配置项名称 */
    name: string;
  };

  type getRoleParams = {
    /** 角色唯一标识符 */
    roleId: number;
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
    userId: number;
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
    phoneType?: PhoneLoginType;
  };

  type LoginResponse =
    // #/components/schemas/Response
    Response & {
      data?: TokenData;
    };

  type LoginType = 'email' | 'phone' | 'account';

  type Media = {
    /** 媒体资源ID */
    mediaId?: number;
    /** 媒体资源类型 */
    type?: string;
    /** 媒体资源URL */
    url?: string;
    /** 创建时间戳 */
    createdAt?: string;
    /** 更新时间戳 */
    updatedAt?: string;
  };

  type MenuRequest = {
    /** 菜单名称 */
    menuName?: string;
    /** 路由地址 */
    path?: string;
    /** 菜单图标 */
    icon?: string;
    /** 父菜单 ID */
    parentId?: number;
    /** 排序 */
    sortOrder?: number;
    /** 组件路径 */
    component?: string;
    /** 路由参数 */
    query?: string;
    /** 是否为外链 （0否 1是） */
    isFrame?: number;
    /** 是否缓存（0不缓存 1缓存） */
    isCache?: number;
    /** 菜单类型 （0目录 1菜单 2按钮） */
    menuType?: number;
    /** 菜单状态（0隐藏 1显示） */
    visible?: number;
    /** 菜单状态（0停用 1正常） */
    status?: number;
    /** 权限标识 */
    perms?: string;
    /** 创建人 ID */
    createdId?: number;
    /** 创建人 */
    createdBy?: string;
    /** 更新人 ID */
    updatedId?: number;
    /** 更新人 */
    updatedBy?: string;
    /** 备注 */
    remark?: string;
  };

  type optionResponse = {
    /** 状态码 */
    code?: number;
    /** 提示信息 */
    msg?: string;
    /** 返回数据 */
    data?: { optionName?: string; optionValue?: Record<string, any> };
  };

  type Pagination = {
    /** 当前页码 */
    page?: number;
    /** 每页显示的数据条数 */
    pageSize?: number;
    /** 总数据条数 */
    total?: number;
  };

  type PhoneLoginType = 'sms' | 'password';

  type Response = {
    /** Response code */
    code: number;
    /** Response message */
    msg: string;
    /** 返回数据 */
    data?: Record<string, any>;
  };

  type Role = {
    /** 角色ID */
    roleId?: number;
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 排序权重 */
    sort?: number;
    /** 状态（例如：1-启用，0-禁用） */
    status?: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type RoleListResponse =
    // #/components/schemas/Response
    Response & {
      data?: { pagination: Pagination; roles: Role[] } | Role[];
    };

  type RoleReq = {
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 排序值 */
    sort?: number;
    /** 角色状态，1表示启用，0表示禁用 */
    status?: number;
  };

  type RoleResponse = {
    data?: Role;
  };

  type setOptionValueParams = {
    /** 配置项名称 */
    name: number;
  };

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

  type updateArticleCategoryParams = {
    /** 文章分类ID */
    articleCategoryId: number;
  };

  type updateArticleParams = {
    /** 文章ID */
    articleId: number;
  };

  type updateMediaParams = {
    /** 媒体资源唯一标识符 */
    mediaId: number;
  };

  type updateMenuParams = {
    /** 菜单的 ID */
    menuId: number;
  };

  type updateRoleParams = {
    /** 角色唯一标识符 */
    roleId: number;
  };

  type updateUserParams = {
    /** 管理员用户的ID */
    userId: number;
  };

  type User = {
    /** 用户ID */
    userId: number;
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

  type UserResponse =
    // #/components/schemas/Response
    Response & {
      data?: User;
    };
}
