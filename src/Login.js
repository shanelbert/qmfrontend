import React from 'react';
import * as helper from './helper';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Hidden from '@material-ui/core/Hidden';

import MuiAlert from '@material-ui/lab/Alert';

function Login() {
  const useStyles = makeStyles((theme) => ({
    themebg: {
      backgroundColor: '#673ab7',
      color: 'white'
    }
  }));

  const classes = useStyles();

  const [url, setURL] = React.useState();
  const [role, setRole] = React.useState();
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      helper.getToken(code).then((res) => {
        localStorage.setItem('access_token', res.data);
        helper.getRole().then((response) => {
          if (response.data === 'pengatur') {
            window.location.replace('./pengatur');
          } else { // peran === 'pelapor'
            window.location.replace('./pelapor');
          }
        }).catch((err) => {
          console.log(err);
          window.location.replace('./');
        })
      }).catch((err) => {
        console.log(err);
        window.location.replace('./');
      });
    } else {
      helper.getRole().then((response) => {
        setRole(response.data);
      }).catch((err) => {
        setRole(null);
      })

      helper.getGoogleLoginURL().then((res) => {
        setURL(res.data);
      });
      setLoad(true);
    }
  }, [])

  const [roleRadioValue, setRadioValue] = React.useState('pengatur');
  const [emailValue, setEmailValue] = React.useState('');

  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmailValue(event.target.value);
  };

  function handleSubmit() {
    if (emailValue) {
      helper.upsertUser({ email: emailValue, peran: roleRadioValue }).then(() => {
        handleOpenSnackbar('success', `Akun dengan email ${emailValue} mendapat peran '${roleRadioValue}'`);

        helper.getRole().then((response) => {
          setRole(response.data);
        }).catch((err) => {
          setRole(null);
        })
      }).catch((err) => {
        console.log(err.response)
      });
    }
  }

  const [snackbarContent, setSnackbarContent] = React.useState('');
  const [severity, setSeverity] = React.useState('info');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  function handleOpenSnackbar(severity, content) {
    setOpenSnackbar(true);
    setSeverity(severity);
    setSnackbarContent(content);
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      // agar snackbar tidak langsung ditutup tepat setelah dibuka.
      // tombol submit diklik -> membuka snackbar
      // daerah di luar snackbar diklik -> menutup snackbar
      // tombol submit adalah daerah di luar snackbar
      return;
    }
    setOpenSnackbar(false);
  }


  return (
    <Grid container justify='center' alignContent='center' style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={(event, reason) => { handleCloseSnackbar(event, reason) }}
      >
        <MuiAlert variant='filled' icon={false} severity={severity} onClose={(event, reason) => { handleCloseSnackbar(event, reason) }}>
          {snackbarContent}
        </MuiAlert>
      </Snackbar>

      {(load) ? (
        <Grid container item style={{ maxWidth: '600px' }}>
          {/* Nama Aplikasi*/}
          <Grid container item justify='center'>
            <Hidden smUp>
              <Typography variant='h3' align='center'>
                Q Manager
              </Typography>
            </Hidden>
            <Hidden xsDown>
              <Typography variant='h1' align='center'>
                Q Manager
              </Typography>
            </Hidden>
          </Grid>

          {/* Tombol */}
          {(role) ? (
              <Grid container item>
                <Hidden smUp>
                  <Grid container item alignItems='center' direction='column' wrap='nowrap' style={{ marginTop: '16px' }}>

                    <Grid item>
                      <a href={url} style={{ textDecoration: 'none' }}>
                        <Button
                          variant='contained'
                          className={classes.themebg}
                          style={{ marginBottom: '24px' }}
                        >
                          Ganti Akun
                        </Button>
                      </a>
                    </Grid>
                    <Grid item>
                      <a href={`./${role}`} style={{ textDecoration: 'none' }}>
                        <Button
                          variant='contained'
                          className={classes.themebg}
                        >
                          Buka Halaman {role}
                        </Button>
                      </a>
                    </Grid>
                  </Grid>
                </Hidden>

                <Hidden xsDown>
                  <Grid container item justify='center' style={{ marginTop: '16px' }}>
                    <Grid item>
                      <a href={url} style={{ textDecoration: 'none' }}>
                        <Button
                          variant='contained'
                          className={classes.themebg}
                          style={{ marginRight: '40px' }}
                        >
                          Ganti Akun
                        </Button>
                      </a>
                    </Grid>
                    <Grid item>
                      <a href={`./${role}`} style={{ textDecoration: 'none' }}>
                        <Button
                          variant='contained'
                          className={classes.themebg}
                        >
                          Buka Halaman {role}
                        </Button>
                      </a>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
            ) : (
              <Grid container item xs='12' justify='center' style={{ marginTop: '16px' }}>
                <Grid item>
                  <a href={url} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' className={classes.themebg}>Login</Button>
                  </a>
                </Grid>
              </Grid>
            )}

          {/* Form */}
          <Grid container item justify='center' style={{ marginTop: '32px' }}>
            <Paper>
              <Grid container item xs='12' wrap='nowrap' direction='column' alignItems='center' style={{ padding: '16px' }}>
                <Grid item >
                  {/* Judul */}
                  <Typography variant='h5' align='center'>Registrasi Akun/Ganti Peran</Typography>
                  <Typography align='center' color='textSecondary' style={{ fontSize: '0.8em' }}>
                    Jika belum pernah ditambahkan, akun akan ditambahkan ke basisdata. <br />
                    Jika sudah pernah ditambahkan, peran akun di basisdata akan diperbarui.
                  </Typography>
                </Grid>

                {/* Textfield - Email*/}
                <Grid item style={{ marginTop: '24px' }}>
                  <TextField
                    variant='outlined'
                    label='Email Google'
                    size='small'
                    value={emailValue}
                    onChange={(e) => { handleChangeEmail(e) }}
                  />
                </Grid>

                {/* Radio - Peran*/}
                <Grid item style={{ marginTop: '16px' }}>
                  <FormControl>
                    <FormLabel component='legend'>Peran</FormLabel>
                    <RadioGroup row defaultValue='pengatur' value={roleRadioValue} onChange={(e) => { handleChangeRadio(e) }}>
                      <FormControlLabel
                        value='pengatur'
                        control={<Radio color='primary' />}
                        label='Pengatur'
                        labelPlacement='bottom'
                      />
                      <FormControlLabel
                        value='pelapor'
                        control={<Radio color='primary' />}
                        label='Pelapor'
                        labelPlacement='bottom'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* Tombol submit */}
                <Grid item style={{ marginTop: '24px' }}>
                  <Button
                    variant='contained'
                    className={classes.themebg}
                    onClick={() => { handleSubmit() }}
                  >
                    Set
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        null
      )}
    </Grid>
  )
}

export default Login;
