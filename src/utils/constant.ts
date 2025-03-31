// 判定是开发环境
export const publicPath = process.env.NODE_ENV === 'development' ? '/' : '/admin/';