import { StylesConfig } from 'react-select';
import colors from 'tailwindcss/colors';

export const styles: StylesConfig = {
  control: (base) => ({
    ...base,
    backgroundColor: colors.zinc[900],
    borderColor: colors.zinc[700],
    ':focus-within': {
      borderColor: colors.blue[600],
      boxShadow: `0.1rem 0.1rem 0.1rem ${colors.blue[600]}, -0.1rem -0.1rem 0.1rem ${colors.blue[600]}`,
    },
    ':hover': {
      borderColor: colors.blue[600],
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: colors.zinc[900],
  }),
  input: (base) => ({
    ...base,
    height: '3rem',
    backgroundColor: colors.zinc[900],
    color: colors.zinc[300],
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? colors.zinc[700] : colors.zinc[900],
    color: colors.zinc[400],
    ':hover': {
      backgroundColor: colors.zinc[700],
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: colors.zinc[300],
    position: 'relative',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: colors.zinc[900],
    color: colors.zinc[200],
  }),
  multiValueLabel: (base) => ({
    ...base,
    backgroundColor: colors.zinc[700],
    color: colors.zinc[300],
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: colors.zinc[700],
    color: colors.zinc[300],
  }),
};
