export type Role = 'Employee' | 'Admin' | 'Manager';

export type User = {
  id: string;
  username: string;
  roles: Role[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
