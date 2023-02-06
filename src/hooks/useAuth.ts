import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { selectCurrentToken } from '../features/auth/authSlice';
import { Role } from '../shared/types';

interface JwtPayload {
  userInfo: {
    username: string;
    roles: Role;
  };
}

export function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isManager = false;
  let status = 'Employee';

  if (token) {
    const decoded = jwtDecode(token) as JwtPayload;

    const { username, roles } = decoded.userInfo;

    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');

    if (isManager) {
      status = 'Manager';
    }

    if (isAdmin) {
      status = 'Admin';
    }

    return {
      username,
      roles,
      isManager,
      isAdmin,
      status,
    };
  }

  return {
    username: '',
    roles: [],
    isManager,
    isAdmin,
    status,
  };
}
