export interface Post {
  postId: number;
  postCode: string;
  postName: string;
  sortOrder?: number;
  status: 0 | 1;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
}