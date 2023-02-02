import { Ref } from 'react';
import ReactSelect, { GroupBase, Props } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';

import { styles } from '../configs/reactSelect';
import { userRoles } from '../shared/data';

interface RolesSelectProps extends Props {
  innerRef: Ref<Select<unknown, boolean, GroupBase<unknown>>> | undefined;
}

export function RolesSelect({ innerRef, ...rest }: RolesSelectProps) {
  const options = Object.keys(userRoles).map((key) => {
    return {
      value: key,
      label: userRoles[key as keyof typeof userRoles],
    };
  });

  return (
    <ReactSelect
      ref={innerRef}
      inputId="roles"
      isMulti
      options={options}
      placeholder="Selecione..."
      noOptionsMessage={() => 'Sem opções'}
      styles={styles}
      required
      {...rest}
    />
  );
}
