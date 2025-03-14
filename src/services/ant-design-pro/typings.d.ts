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

  type ApiResp =
    // #/components/schemas/Response
    Response & {
      data?: Api;
    };

  type Article = {
    /** 文章ID */
    articleId?: number;
    /** 发布格式 */
    postFormat?: number;
    /** SEO标题 */
    seoTitle?: string;
    /** SEO关键词 */
    seoKeywords?: string;
    /** SEO描述 */
    seoDescription?: string;
    /** 缩略图URL */
    thumbnail?: string;
    /** 文章标题 */
    title?: string;
    /** 文章内容，支持HTML格式 */
    content?: string;
    /** 关键词列表 */
    keywords?: string[];
    /** 摘要 */
    excerpt?: string;
    /** 来源 */
    source?: string;
    /** 是否置顶 */
    isTop?: boolean;
    /** 点击量 */
    hits?: number;
    /** 收藏数 */
    favorites?: number;
    /** 点赞数 */
    likes?: number;
    /** 评论数 */
    comments?: number;
    /** 其他信息 */
    more?: Record<string, any>;
    /** 文章状态（例如：1-已发布，0-草稿） */
    articleStatus?: number;
    /** 评论状态（例如：1-允许，0-不允许） */
    commentStatus?: number;
    /** 排序权重 */
    order?: number;
    /** 发布时间，Unix时间戳格式 */
    publishedAt?: number;
    /** 创建者ID */
    createId?: number;
    /** 创建者名称 */
    creator?: string;
    /** 更新者ID */
    updateId?: number;
    /** 更新者名称 */
    updater?: string;
    /** 创建时间，Unix时间戳格式 */
    createdAt?: number;
    /** 更新时间，Unix时间戳格式 */
    updatedAt?: number;
    /** 删除时间，Unix时间戳格式，0表示未删除 */
    deletedAt?: number;
    /** 创建时间的可读格式 */
    createdTime?: string;
    /** 更新时间的可读格式 */
    updatedTime?: string;
    /** 发布时间的可读格式 */
    publishedTime?: string;
    /** 分类信息 */
    category?: { categoryId?: number; categoryName?: string }[];
  };

  type ArticleCategory = {
    /** 分类ID */
    articleCategoryId?: number;
    /** 父级分类ID，0表示顶级分类 */
    parentId?: number;
    /** SEO标题 */
    seoTitle?: string;
    /** SEO关键词 */
    seoKeywords?: string;
    /** SEO描述 */
    seoDescription?: string;
    /** 分类名称 */
    name?: string;
    /** 分类图标 */
    icon?: string;
    /** 分类描述 */
    description?: string;
    /** 分类状态（例如：1-启用，0-禁用） */
    status?: number;
    /** 该分类下的文章数量 */
    articleCount?: number;
    /** 分类路径，用于标识层级关系 */
    path?: string;
    /** 排序权重 */
    order?: number;
    /** 创建者ID */
    createId?: number;
    /** 创建者名称 */
    creator?: string;
    /** 更新者ID */
    updateId?: number;
    /** 更新者名称 */
    updater?: string;
    /** 创建时间，Unix时间戳格式 */
    createdAt?: number;
    /** 更新时间，Unix时间戳格式 */
    updatedAt?: number;
    /** 删除时间，Unix时间戳格式，0表示未删除 */
    deletedAt?: number;
  };

  type ArticleCategoryListResp =
    // #/components/schemas/Response
    Response & {
      data?:
        | { pagination: Pagination; data?: Article[] }
        | ArticleCategory[]
        | ArticleCategoryTree[];
    };

  type ArticleCategoryResp =
    // #/components/schemas/Response
    Response & {
      data?: ArticleCategory;
    };

  type ArticleCategoryTree = {
    articleCategory?: ArticleCategory;
    /** 子文章列表 */
    children?: ArticleCategory[];
  };

  type ArticleListResp =
    // #/components/schemas/Response
    Response & {
      data?: { pagination: Pagination; data?: Article[] } | Article[];
    };

  type ArticleResp =
    // #/components/schemas/Response
    Response & {
      data?: Article;
    };

  type ArticleTag = {
    /** 标签ID */
    tagId?: number;
    /** 标签名称 */
    name?: string;
  };

  type deleteArticleCategoryParams = {
    /** 文章分类ID */
    articleCategoryId: number;
  };

  type deleteArticleParams = {
    /** 文章ID */
    articleId: number;
  };

  type deleteDeptParams = {
    /** 部门唯一标识符 */
    deptId: number;
  };

  type deleteDictDataParams = {
    dictCode: number;
  };

  type deleteDictTypeParams = {
    dictId: number;
  };

  type deleteMediaCategoryParams = {
    /** 媒体分类ID */
    categoryId: number;
  };

  type deleteMediaParams = {
    mediaId: number;
  };

  type deleteMenuParams = {
    /** 菜单的 ID */
    menuId: number;
  };

  type deletePostParams = {
    /** 岗位唯一标识符 */
    postId: number;
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

  type DeptInfo = {
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 父部门ID */
    parentId?: number;
    /** 排序序号 */
    sortOrder?: number;
    /** 部门负责人 */
    leader?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态，0表示禁用，1表示启用 */
    status?: number;
    /** 创建人ID */
    createdId?: number;
    /** 创建人 */
    createdBy?: string;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 删除时间，0表示未删除 */
    deletedAt?: string;
  };

  type DeptListResp =
    // #/components/schemas/Response
    Response & {
      data?: DeptInfo[];
    };

  type DeptReq = {
    /** 部门名称 */
    deptName: string;
    /** 父部门ID，0表示顶级部门 */
    parentId?: number;
    /** 排序序号 */
    sortOrder?: number;
    /** 部门负责人 */
    leader?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态，0表示禁用，1表示启用 */
    status?: 0 | 1;
  };

  type DeptResp =
    // #/components/schemas/Response
    Response & {
      data?: DeptInfo;
    };

  type DeptTreeInfo = {
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 父部门ID */
    parentId?: number;
    /** 排序序号 */
    sortOrder?: number;
    /** 部门负责人 */
    leader?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态，0表示禁用，1表示启用 */
    status?: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 子部门列表 */
    children?: DeptTreeInfo[];
  };

  type DeptTreeResp =
    // #/components/schemas/Response
    Response & {
      data?: DeptTreeInfo[];
    };

  type DictData = {
    dictCode?: number;
    dictLabel?: string;
    dictValue?: string;
    dictType?: string;
    dictSort?: number;
    cssClass?: string;
    listClass?: string;
    isDefault?: string;
    status?: string;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type DictDataCreate = {
    dictSort: number;
    dictLabel: string;
    dictValue: string;
    dictType: string;
    cssClass?: string;
    listClass?: string;
    isDefault?: string;
    status?: string;
    remark?: string;
  };

  type DictDataListResp =
    // #/components/schemas/Response
    Response & {
      data?: Pagination & { data?: DictData[] };
    };

  type DictDataResp =
    // #/components/schemas/Response
    Response & {
      data?: DictData;
    };

  type DictDataUpdate = {
    dictSort: number;
    dictLabel: string;
    dictValue: string;
    dictType: string;
    cssClass?: string;
    listClass?: string;
    isDefault?: string;
    status?: string;
    remark?: string;
  };

  type DictType = {
    dictId?: number;
    dictName?: string;
    dictType?: string;
    status?: string;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type DictTypeCreate = {
    dictName: string;
    dictType: string;
  };

  type DictTypeListResp =
    // #/components/schemas/Response
    Response & {
      data?: Pagination & { data?: DictType[] };
    };

  type DictTypeResp =
    // #/components/schemas/Response
    Response & {
      data?: DictType;
    };

  type DictTypeUpdate = {
    dictName: string;
    dictType: string;
  };

  type exportLoginLogParams = {
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录账号 */
    loginName?: string;
    /** 登录状态（0成功 1失败） */
    status?: 0 | 1;
    /** 开始时间（时间戳） */
    startTime?: number;
    /** 结束时间（时间戳） */
    endTime?: number;
  };

  type exportOperationLogParams = {
    /** 模块标题 */
    title?: string;
    /** 操作人员 */
    operName?: string;
    /** 业务类型（0其它 1新增 2修改 3删除 4授权 5导出 6导入 7强退 8清空数据） */
    businessType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** 操作状态（0异常 1正常） */
    status?: 0 | 1;
    /** 操作IP地址 */
    operIp?: string;
    /** 开始时间（时间戳） */
    startTime?: number;
    /** 结束时间（时间戳） */
    endTime?: number;
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

  type getDeptListParams = {
    /** 部门名称（模糊查询） */
    deptName?: string;
    /** 负责人姓名（模糊查询） */
    leader?: string;
    /** 部门状态（0-禁用，1-启用） */
    status?: 0 | 1;
    /** 创建时间范围-开始时间（时间戳） */
    startTime?: string;
    /** 创建时间范围-结束时间（时间戳） */
    endTime?: string;
  };

  type getDeptParams = {
    /** 部门唯一标识符 */
    deptId: number;
  };

  type getDeptTreeParams = {
    /** 部门名称（模糊查询） */
    deptName?: string;
    /** 负责人姓名（模糊查询） */
    leader?: string;
    /** 部门状态（0-禁用，1-启用） */
    status?: 0 | 1;
    /** 创建时间范围-开始时间（时间戳） */
    startTime?: string;
    /** 创建时间范围-结束时间（时间戳） */
    endTime?: string;
  };

  type getDictDataListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 字典类型 */
    dictType?: string;
    /** 字典标签 */
    dictLabel?: string;
  };

  type getDictDataParams = {
    /** 字典数据编码 */
    dictCode: number;
  };

  type getDictTypeListParams = {
    /** 当前页码 */
    page?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
  };

  type getDictTypeParams = {
    dictId: number;
  };

  type getLoginLogDetailParams = {
    /** 登录日志ID */
    id: number;
  };

  type getLoginLogListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录账号 */
    loginName?: string;
    /** 登录状态（0成功 1失败） */
    status?: 0 | 1;
    /** 开始时间（时间戳） */
    startTime?: number;
    /** 结束时间（时间戳） */
    endTime?: number;
  };

  type getMediaCategoryListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页条数 */
    pageSize?: number;
  };

  type getMediaCategoryParams = {
    /** 媒体分类ID */
    categoryId: number;
  };

  type getMediaCategoryTreeParams = {
    /** 父级分类ID，默认为0表示获取顶级分类 */
    parentId?: number;
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

  type getMenusParams = {
    /** 菜单名称（支持模糊查询） */
    menuName?: string;
    /** 菜单状态（0停用 1正常） */
    status?: 0 | 1;
  };

  type getOperationLogDetailParams = {
    /** 操作日志ID */
    id: number;
  };

  type getOperationLogListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 模块标题 */
    title?: string;
    /** 操作人员 */
    operName?: string;
    /** 业务类型（0其它 1新增 2修改 3删除 4授权 5导出 6导入 7强退 8清空数据） */
    businessType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** 操作状态（0异常 1正常） */
    status?: 0 | 1;
    /** 操作IP地址 */
    operIp?: string;
    /** 开始时间（时间戳） */
    startTime?: number;
    /** 结束时间（时间戳） */
    endTime?: number;
  };

  type getOptionValueParams = {
    /** 配置项名称 */
    name: string;
  };

  type getPostListParams = {
    /** 岗位编码 */
    postCode?: string;
    /** 岗位名称 */
    postName?: string;
    /** 岗位状态，0表示禁用，1表示启用 */
    status?: 0 | 1;
    /** 创建时间范围的开始时间 */
    startTime?: string;
    /** 创建时间范围的结束时间 */
    endTime?: string;
  };

  type getPostParams = {
    /** 岗位唯一标识符 */
    postId: number;
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

  type LoginLog = {
    /** 访问ID */
    infoId?: number;
    /** 登录账号 */
    loginName?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 登录状态（0成功 1失败） */
    status?: number;
    /** 提示消息 */
    msg?: string;
    /** 访问时间（时间戳） */
    loginTime?: number;
    /** 用户ID */
    userId?: number;
  };

  type LoginReq = {
    /** 用户的账号，可以是邮箱、手机号或用户名 */
    account: string;
    /** 用户的登录密码，使用密码登录时必须提供 */
    password: string;
    loginType?: LoginType;
    phoneType?: PhoneLoginType;
  };

  type LoginResp =
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

  type MediaCategory = {
    /** 分类ID */
    categoryId?: number;
    /** 父级分类ID，0表示顶级分类 */
    parentId?: number;
    /** 分类名称 */
    name?: string;
    /** 分类状态（例如：1-启用，0-禁用） */
    status?: number;
    /** 创建时间，Unix时间戳格式 */
    createdAt?: number;
    /** 更新时间，Unix时间戳格式 */
    updatedAt?: number;
    /** 删除时间，Unix时间戳格式，0表示未删除 */
    deletedAt?: number;
    /** 子分类列表，仅在树形结构返回时有效 */
    children?: MediaCategory[];
  };

  type MediaCategoryListResp =
    // #/components/schemas/Response
    Response & {
      data?: (Pagination & { data?: MediaCategory[] }) | MediaCategory[];
    };

  type MediaCategoryResp =
    // #/components/schemas/Response
    Response & {
      data?: MediaCategory;
    };

  type MediaListResp =
    // #/components/schemas/Response
    Response & {
      data?: (Pagination & { medias?: Media[] }) | Media[];
    };

  type MediaResp =
    // #/components/schemas/Response
    Response & {
      data?: MediaListResp;
    };

  type Menu = {
    /** 菜单ID */
    menuId?: number;
    /** 菜单名称 */
    menuName?: string;
    /** 路由路径 */
    path?: string;
    /** 菜单图标 */
    icon?: string;
    /** 父级菜单ID，0表示顶级菜单 */
    parentId?: number;
    /** 排序权重 */
    sortOrder?: number;
    /** 组件路径或名称 */
    component?: string;
    /** 查询参数 */
    query?: string;
    /** 是否为外部链接（例如：0-否，1-是） */
    isFrame?: number;
    /** 是否缓存页面（例如：0-否，1-是） */
    isCache?: number;
    /** 菜单类型（例如：1-目录，2-菜单，3-按钮） */
    menuType?: number;
    /** 是否可见（例如：0-隐藏，1-显示） */
    visible?: number;
    /** 状态（例如：0-禁用，1-启用） */
    status?: number;
    /** 权限标识 */
    perms?: string;
    /** 创建者ID */
    createdId?: number;
    /** 创建者名称 */
    createdBy?: string;
    /** 创建时间，Unix时间戳格式 */
    createdAt?: number;
    /** 更新者ID */
    updatedId?: number;
    /** 更新者名称 */
    updatedBy?: string;
    /** 更新时间，Unix时间戳格式 */
    updatedAt?: number;
    /** 备注信息 */
    remark?: string;
  };

  type MenuListResp =
    // #/components/schemas/MenuResp
    MenuResp & {
      data?: { pagination: Pagination; roles: Menu[] } | Menu[];
    };

  type MenuReq = {
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

  type OperationLog = {
    /** 日志主键 */
    operId?: number;
    /** 模块标题 */
    title?: string;
    /** 业务类型（0其它 1新增 2修改 3删除 4授权 5导出 6导入 7强退 8清空数据） */
    businessType?: number;
    /** 方法名称 */
    method?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    operatorType?: number;
    /** 操作人员 */
    operName?: string;
    /** 部门名称 */
    deptName?: string;
    /** 请求URL */
    operUrl?: string;
    /** 主机地址 */
    operIp?: string;
    /** 操作地点 */
    operLocation?: string;
    /** 请求参数 */
    operParam?: string;
    /** 返回参数 */
    jsonResult?: string;
    /** 操作状态（0异常 1正常） */
    status?: number;
    /** 错误消息 */
    errorMsg?: string;
    /** 操作时间（时间戳） */
    operTime?: number;
    /** 用户ID */
    userId?: number;
  };

  type optionResp = {
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

  type PostInfo = {
    /** 岗位ID */
    postId?: number;
    /** 岗位编码 */
    postCode?: string;
    /** 岗位名称 */
    postName?: string;
    /** 排序序号 */
    sortOrder?: number;
    /** 岗位状态，0表示禁用，1表示启用 */
    status?: 0 | 1;
    /** 备注 */
    remark?: string;
    /** 创建者ID */
    createdId?: number;
    /** 创建者名称 */
    createdBy?: string;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 删除时间，0表示未删除 */
    deletedAt?: string;
  };

  type PostListResp = {
    /** 响应状态码 */
    code?: number;
    /** 响应消息 */
    msg?: string;
    data?: PostInfo[];
  };

  type PostReq = {
    /** 岗位编码 */
    postCode: string;
    /** 岗位名称 */
    postName: string;
    /** 排序序号 */
    sortOrder?: number;
    /** 岗位状态，0表示禁用，1表示启用 */
    status?: 0 | 1;
    /** 备注 */
    remark?: string;
  };

  type PostResp = {
    /** 响应状态码 */
    code?: number;
    /** 响应消息 */
    msg?: string;
    data?: PostInfo;
  };

  type Response = {
    /** Response code */
    code: number;
    /** Response message */
    msg: string;
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
    /** 菜单ID列表 */
    menuIds?: number[];
  };

  type RoleListResp =
    // #/components/schemas/Response
    Response & {
      data?: { page?: number; pageSize?: number; total?: number; data?: Role[] };
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

  type RoleResp =
    // #/components/schemas/Response
    Response & {
      data?: Role;
    };

  type setOptionValueParams = {
    /** 配置项名称 */
    name: number;
  };

  type TagListResp =
    // #/components/schemas/Response
    Response & {
      data?: { pagination: Pagination; data?: ArticleTag[] } | ArticleTag[];
    };

  type TagResp =
    // #/components/schemas/Response
    Response & {
      data?: ArticleTag;
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

  type updateDeptParams = {
    /** 部门唯一标识符 */
    deptId: number;
  };

  type updateDictDataParams = {
    dictCode: number;
  };

  type updateDictTypeParams = {
    dictId: number;
  };

  type updateMediaCategoryParams = {
    /** 媒体分类ID */
    categoryId: number;
  };

  type updateMediaParams = {
    /** 媒体资源唯一标识符 */
    mediaId: number;
  };

  type updateMenuParams = {
    /** 菜单的 ID */
    menuId: number;
  };

  type updatePostParams = {
    /** 岗位唯一标识符 */
    postId: number;
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

  type UserResp =
    // #/components/schemas/Response
    Response & {
      data?: User;
    };
}
