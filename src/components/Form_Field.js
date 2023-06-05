import { TextField, MenuItem } from '@mui/material';

const normal_field = (field_name) => <TextField
  id="outlined-search"
  label={field_name}
  type="search"
/>

const email_field = (field_name, onChangeAction) => < TextField
  id="outlined-search"
  label={field_name}
  type="search"
  onChange={onChangeAction}
/>

const password_field = (field_name, onChangeAction) => <TextField
  id="outlined-password-input"
  label={field_name}
  type="password"
  autoComplete="current-password"
  onChange={onChangeAction}
/>

const dropdown_field = (field_name, values) => 
<TextField
  id="outlined-select-currency"
  select
  label={field_name}
  type="dropdown"
  defaultValue={''}
>
  {values.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>

const Form_Field = ({ field_name, type, values, onChangeAction }) => {
  return type == "search"
    ? normal_field(field_name)
    : type == "password"
      ? password_field(field_name, onChangeAction)
      : type == "email"
        ? email_field(field_name, onChangeAction)
        : dropdown_field(field_name, values);
}

export default Form_Field