import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../shared/types';

interface RequireAuthProps {
  allowedRoles: Role[];
}

export function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
}
