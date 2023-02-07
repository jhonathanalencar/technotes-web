import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function RequireAuth() {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some();

  return content;
}
