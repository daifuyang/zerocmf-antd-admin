# ZeroCMF Ant Design Pro 后台管理系统

[![Ant Design Pro](https://img.shields.io/badge/Ant%20Design%20Pro-v5.0.0-blue.svg)](https://pro.ant.design/)
[![Umi](https://img.shields.io/badge/Umi-4.x-brightgreen)](https://umijs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178c6)](https://www.typescriptlang.org/)

基于 Ant Design Pro v5 构建的企业级中后台前端解决方案，提供完整的权限管理和模块化开发架构。

## 技术栈

- ⚛️ React 18
- 🦄 Umi 4 前端框架
- 🎨 Ant Design 5 + ProComponents
- 📘 TypeScript 4.x
- 📦 pnpm 包管理
- 🌍 多语言国际化支持

## 功能特性

### 系统功能
- 🛠 完善的权限管理系统（菜单/角色/用户）
- 📚 文章管理（分类/标签/内容）
- 👥 用户权限体系（管理员/角色/部门）
- 📊 数据字典管理
- 📁 文件管理系统
- 📈 操作日志追踪

### 开发特性
- 🚀 基于Umi的模块化开发架构
- 🌐 支持8种语言国际化
- 📱 响应式布局
- 🛡 TypeScript类型安全
- 🔄 前端Mock数据支持
- 🧪 Jest单元测试集成

## 快速开始

### 环境要求
- Node.js 16.14+ 
- pnpm 7.x+

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm start
```
访问 http://localhost:8000

### 生产构建
```bash
pnpm build
```

### 代码检查
```bash
pnpm lint
```

## 项目结构

```
├── config              # 全局配置
│   ├── config.ts       # 应用配置
│   ├── proxy.ts        # 代理配置
│   └── routes.ts       # 路由配置
├── src
│   ├── access.ts       # 权限管理
│   ├── services        # 数据服务
│   ├── pages           # 页面组件
│   │   ├── Article     # 文章管理
│   │   ├── System      # 系统管理
│   │   └── User        # 用户管理
│   ├── locales         # 国际化资源
│   └── components      # 公共组件
├── public              # 静态资源
└── tests               # 测试用例
```

## 部署说明

### Docker部署
```Dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### Serverless部署
```bash
npm install -g @serverless-devs/s
s deploy
```

## 相关文档

- [Ant Design Pro 文档](https://pro.ant.design/docs/getting-started)
- [Umi 框架指南](https://umijs.org/docs/guides/getting-started)
- [ProComponents 组件库](https://procomponents.ant.design/)
- [Ant Design 设计规范](https://ant.design/docs/spec/introduce)
