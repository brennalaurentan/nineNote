import TextField from '@mui/material/TextField';

const normal_field = (field_name) => <TextField 
                                      id="outlined-search" 
                                      label={field_name}
                                      type="search" />

const password_field = (field_name) => <TextField
                                        id="outlined-password-input"
                                        label={field_name}
                                        type="password"
                                        autoComplete="current-password"
                                        />

const Form_Field = ({ field_name, type }) => {
  return type == "normal"
         ? normal_field(field_name)
         : password_field(field_name)
}

export default Form_Field