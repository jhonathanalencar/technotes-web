import { useTitle } from './hooks/useTitle';
import { Router } from './Router';

export function App() {
  useTitle('JH Reparos');

  return <Router />;
}
