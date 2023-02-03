import { Ref } from 'react';
import ReactSelect, { GroupBase, Props } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';

import { styles } from '../configs/reactSelect';

interface RolesSelectProps extends Props {
  innerRef: Ref<Select<unknown, boolean, GroupBase<unknown>>> | undefined;
}

export function SelectInput({ innerRef, ...rest }: RolesSelectProps) {
  return (
    <ReactSelect
      ref={innerRef}
      placeholder="Selecione..."
      noOptionsMessage={() => 'Sem opções'}
      styles={styles}
      required
      {...rest}
    />
  );
}
