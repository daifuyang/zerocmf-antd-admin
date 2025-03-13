export interface Dept {
  deptId: number;
  parentId: number;
  deptName: string;
  orderNum?: number;
  leader?: string;
  phone?: string;
  email?: string;
  status: 0 | 1;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  children?: Dept[];
}