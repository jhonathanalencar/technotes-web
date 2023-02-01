import { useParams } from 'react-router-dom';

export function EditUser() {
  const { id } = useParams();
  return <div className="text-gray-100">{id}</div>;
}
