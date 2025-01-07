// interfaces.ts
export interface Role {
  roleId: number;
  name: string;
  description?: string;
  sort?: number;
  status: 0 | 1;
  enabled;
  disabled; // 0:禁用 1:启用
  menuIds?: number[];
}
