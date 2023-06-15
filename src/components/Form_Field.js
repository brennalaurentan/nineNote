import { TextField, MenuItem } from '@mui/material';

<<<<<<< Updated upstream:src/components/Form_Field.js
const normal_field = (field_name) => <TextField
  id="outlined-search"
  label={field_name}
  type="search"
/>
=======
// components / pages / images

// tools
import { TextField, MenuItem } from '@mui/material';
>>>>>>> Stashed changes:src/components/common/FormField.js

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

<<<<<<< Updated upstream:src/components/Form_Field.js
const dropdown_field = (field_name, values) => <TextField
  id="outlined-select-currency"
  select
  label={field_name}
=======
const dropdown_field = (field_name, values, onChangeAction) =>
<TextField
  id="outlined-select-currency"
  select
  label={field_name}
  defaultValue={''}
  onChange={onChangeAction}
>>>>>>> Stashed changes:src/components/common/FormField.js
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
        : dropdown_field(field_name, values, onChangeAction);
}

export default Form_Field