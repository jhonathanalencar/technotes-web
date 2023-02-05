export type Role = 'Employee' | 'Manager' | 'Admin';

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
  ticket: number;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
};

export type QueryError = {
  status: number;
  data?: {
    error: string;
  };
};
