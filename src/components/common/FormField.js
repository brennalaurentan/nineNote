// styles

// components / pages / images

// tools
import { TextField, MenuItem, Select } from '@mui/material';

const email_field = (field_name, onChangeAction, defaultValue) => < TextField
  id="outlined-search"
  label={field_name}
  type="search"
  onChange={onChangeAction}
  sx={{ width: ["300px", "400px"] }}
  value={defaultValue}
/>

const module_field = (field_name, onChangeAction) => < TextField
  id="standard-basic"
  label={field_name}
  variant="standard"
  onChange={onChangeAction}
  fullWidth
/>

const password_field = (field_name, onChangeAction) => <TextField
  id="outlined-password-input"
  label={field_name}
  type="password"
  autoComplete="current-password"
  onChange={onChangeAction}
  sx={{ width: ["300px", "400px"] }}
/>

const dropdown_field = (field_name, values, onChangeAction, defaultValue) =>
  <TextField
    id="outlined-select-currency"
    select
    label={field_name}
    onChange={onChangeAction}
    sx={{ width: ["300px", "400px"] }}
    value={defaultValue}
  >
    {values.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>


const FormField = ({ field_name, type, values, onChangeAction, defaultValue }) => {
  return type === "module"
    ? module_field(field_name, onChangeAction)
    : type === "password"
      ? password_field(field_name, onChangeAction)
      : type === "email"
        ? email_field(field_name, onChangeAction, defaultValue)
        : dropdown_field(field_name, values, onChangeAction, defaultValue);
}

export default FormField