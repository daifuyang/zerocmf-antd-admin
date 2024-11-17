export interface Admin {
  id: number;
  loginName: string;
  email?: string;
  phone: string;
  nickname?: string;
  realName?: string;
  password: string;
  gender?: 0 | 1;
  birthday?: number;
  userType?: number;
  avatar?: string;
  status: 0 | 1;
}
