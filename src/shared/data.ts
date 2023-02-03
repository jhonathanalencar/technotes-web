export const userRoles = {
  Employee: 'Funcionário',
  Manager: 'Gerente',
  Admin: 'Administrador',
};

export const rolesSelectOptions = Object.keys(userRoles).map((key) => {
  return {
    value: key,
    label: userRoles[key as keyof typeof userRoles],
  };
});
