export type Role = 'Employee' | 'Admin' | 'Manager';

export type User = {
  id: string;
  username: string;
  roles: Role[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Note = {
  id: string;
  userId: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
};

export type QueryError = {
  data?: {
    error: string;
  };
};
