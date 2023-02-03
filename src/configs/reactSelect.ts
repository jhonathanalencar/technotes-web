import { StylesConfig } from 'react-select';
import colors from 'tailwindcss/colors';

export const styles: StylesConfig = {
  control: (styles) => ({
    ...styles,
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
  menu: (styles) => ({
    ...styles,
    backgroundColor: colors.zinc[900],
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: '7.5rem',

    '::-webkit-scrollbar': {
      width: '0.25rem',
      height: '0',
    },
    '::-webkit-scrollbar-track': {
      background: colors.zinc[800],
    },
    '::-webkit-scrollbar-thumb': {
      background: colors.blue[600],
      borderRadius: '0.25rem',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: colors.blue[700],
    },
  }),
  input: (styles) => ({
    ...styles,
    height: '3rem',
    backgroundColor: colors.zinc[900],
    color: colors.zinc[300],
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? colors.zinc[700] : colors.zinc[900],
    color: colors.zinc[400],
    ':hover': {
      backgroundColor: colors.zinc[700],
    },
    height: '40px',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: colors.zinc[300],
    position: 'relative',
  }),
  singleValue: (styles) => ({
    ...styles,
    position: 'relative',
    color: colors.zinc[200],
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: colors.zinc[900],
    color: colors.zinc[200],
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    backgroundColor: colors.zinc[700],
    color: colors.zinc[300],
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: colors.zinc[700],
    color: colors.zinc[300],
  }),
};
