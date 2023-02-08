import { Role } from './types';

export const userRoles: { [key in Role]: string } = {
  Employee: 'Funcionário',
  Manager: 'Gerente',
  Admin: 'Administrador',
};

type RolesType = Record<Role, Role>;

export const ROLES: RolesType = {
  Employee: 'Employee',
  Manager: 'Manager',
  Admin: 'Admin',
};

export const rolesSelectOptions = Object.keys(userRoles).map((key) => {
  return {
    value: key,
    label: userRoles[key as keyof typeof userRoles],
  };
});
