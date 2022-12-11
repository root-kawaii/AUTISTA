import React from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Button
} from '@material-ui/core';
import './LoginPage.css';


function LoginPage(){

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
        <div className='LoginPage-header' style={{ padding: 30 }}>
            <Grid
              container
              spacing={3}
              direction={'column'}
              alignItems={'center'}
            >
              <Grid item xs={12}>
                <TextField label="Username" InputLabelProps={{ style: { color: "white" } }}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" type={'password'} InputLabelProps={{ style: { color: "white" } }}></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      label={'Keep me logged in'}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      labelStyle={{color: 'white'}}
                        iconStyle={{fill: 'white'}}
                    />
                  }
                  label="Keep me logged in"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' fullWidth> Login </Button>
              </Grid>
            </Grid>
        </div>
      );
}

export default LoginPage;