import React from 'react';
import * as helper from './helper';
import Forbidden from './Forbidden';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Hidden from '@material-ui/core/Hidden';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import MuiAlert from '@material-ui/lab/Alert';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Pelapor() {
  let base = 8;
  let short = base * 4 + 'px';
  let long = base * 8 + 'px';

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 'unset',
    },
    table1seat: {
      width: short,
      height: short
    },
    table1seatEmpty: {
      backgroundColor: '#049F90',
      color: 'white',
      '&$disabled': {
        backgroundColor: '#049F90'
      }
    },
    table2seatVertical: {
      width: short,
      height: long
    },
    table2seatHorizontal: {
      width: long,
      height: short
    },
    table2seatEmpty: {
      backgroundColor: '#FD7D2E',
      color: 'white',
      '&$disabled': {
        backgroundColor: '#FD7D2E'
      }
    },
    table4seat: {
      width: long,
      height: long
    },
    table4seatEmpty: {
      backgroundColor: '#B2417C',
      color: 'white',
      '&$disabled': {
        backgroundColor: '#B2417C'
      }
    },
    disabled: {
      //(meskipun kosong, ini harus ditambahkan)
    },
    speeddial: {
      position: 'fixed',
      right: '3vw',
      bottom: '3vh',
      zIndex: 1
    },    themebg: {
      backgroundColor: '#673ab7',
      color: 'white'
    }
  }));

  const classes = useStyles();

  const [tables, setTables] = React.useState({});
  const [selectedTables, setSelectedTables] = React.useState({});

  function isObjEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
  }

  function TableButton(props) {
    let { capacity, id, orientation } = props;
    const capacityToCharMap = { '1': 'C', '2': 'B', '4': 'A' };
    let tableCode = `${capacityToCharMap[Number(capacity)]}${id}`;
    let className = classes.table;

    if (capacity === '1') {
      className += ` ${classes.table1seat}`
    } else if (capacity === '2') {
      if (orientation === 'vertical') {
        className += ` ${classes.table2seatVertical}`

      } else {
        className += ` ${classes.table2seatHorizontal}`
      }
    } else {
      className += ` ${classes.table4seat}`
    }

    if (!isObjEmpty(tables)) {
      if (!tables[capacity][id]) {
        if (capacity === '1') {
          className += ` ${classes.table1seatEmpty}`
        } else if (capacity === '2') {
          className += ` ${classes.table2seatEmpty}`
        } else {
          className += ` ${classes.table4seatEmpty}`
        }
      }
    }

    let disabled = true;
    if (!isObjEmpty(tables) && tables[capacity][id]) {
      disabled = false;
    }

    function handleTButtonClick() {
      let temp = { ...selectedTables };
      if (temp[tableCode] === undefined) {
        temp[tableCode] = { id: Number(id), kapasitas: capacity };
        setSelectedTables(temp);
      } else {
        delete temp[tableCode];
        setSelectedTables(temp);
      }
    }

    return (
      <Button
        randomvalue='random'
        variant='contained'
        disableTouchRipple
        disabled={disabled}
        classes={{ root: className, disabled: classes.disabled }}
        onClick={() => { handleTButtonClick() }}

      >
        {(selectedTables[tableCode]) ? (
          <RemoveIcon />
        ) : (
            tableCode
          )}
      </Button>
    );
  }

  function handleCancelClick() {
    setSelectedTables({});
  }

  function handleConfirmClick() {
    let data = { status: false, meja: Object.values(selectedTables) };

    helper.setTablesStatus(data).then(() => {
      helper.getAllTable().then((resTable) => {
        let alltable = { ...allTableTemplate.current };
        resTable.data.forEach((meja) => {
          alltable[meja.kapasitas][meja.id] = meja.status;
        });
        setTables(alltable);
        setSelectedTables({});
        handleOpenSnackbar('success', 'Status meja berhasil diubah');
      }).catch(() => {
        handleOpenSnackbar('error', 'Gagal memuat isi tabel meja');
      });
    }).catch(() => {
      handleOpenSnackbar('error', 'Gagal mengubah status meja');
    });
  }

  const allTableTemplate = React.useRef({});
  const [load, setLoad] = React.useState(false);
  const [openForbidden, setOpenForbidden] = React.useState(false);
  const role = React.useRef();

  React.useEffect(() => {
    helper.getRole().then((response) => {
      if (response.data === 'pelapor') {
        helper.getAllTable().then((res) => {
          let capacityRange = new Set();
          res.data.forEach((meja) => {
            capacityRange.add(meja.kapasitas);
          });

          let alltable = {}
          capacityRange.forEach((cap) => {
            alltable[cap] = {};
          });
          allTableTemplate.current = { ...alltable };

          res.data.forEach((meja) => {
            alltable[meja.kapasitas][meja.id] = meja.status;
          });
          setTables(alltable);
        });
      } else {
        role.current = response.data;
        setOpenForbidden(true);
      }
      setLoad(true);
    }).catch((err) => {
      window.location.replace('./');
    });


  }, []);

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
      return;
    }
    setOpenSnackbar(false);
  }

  function handleSync() {
    helper.getAllTable().then((resTable) => {
      let alltable = { ...allTableTemplate.current };
      resTable.data.forEach((meja) => {
        alltable[meja.kapasitas][meja.id] = meja.status;
      });
      setTables(alltable);
      handleOpenSnackbar('success', 'Peta status meja berhasil diperbarui');
    }).catch(() => {
      handleOpenSnackbar('error', 'Gagal memuat isi tabel meja');
    });
  }


  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const actions = [
    { icon: <HomeIcon />, name: 'Beranda', handler: handleHome },
    { icon: <ExitToAppIcon />, name: 'Logout', handler: handleLogout }
  ];

  function handleClose() {
    setOpenSpeedDial(false);
  };

  function handleOpen() {
    setOpenSpeedDial(true);
  };

  function handleHome() {
    window.location.replace('./');
  };

  function handleLogout() {
    localStorage.removeItem('access_token');
    window.location.replace('./');
  };

  return (
    <div>
      {(load) ? (
        (openForbidden) ? (
          <Forbidden role={role.current} />
        ) : (
          <Grid container justify='center' style={{ background: '#f5f5f5', padding: '16px 0 16px 0', minHeight: '100vh' }} >
            <SpeedDial
              ariaLabel='SpeedDial'
              className={classes.speeddial}
              icon={<AddIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={openSpeedDial}
              direction='up'
              style={{ position: 'fixed' }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.handler}
                />
              ))}
            </SpeedDial>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={2500}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              onClose={(event, reason) => { handleCloseSnackbar(event, reason) }}
            >
              <MuiAlert variant='filled' icon={false} severity={severity} onClose={(event, reason) => { handleCloseSnackbar(event, reason) }}>
                {snackbarContent}
              </MuiAlert>
            </Snackbar>

            <Grid container item>
              {/* Peta Status Meja */}
              <Grid container item justify='center'>
                <Paper style={{ padding: '0 8px 0 8px', overflow: 'auto' }}>
                  {/* Judul */}
                  <Grid container item justify='center' style={{ margin: '8px 0 8px 0', width: '600px' }}>
                    <Typography variant='h4'>Peta Status Meja</Typography>
                  </Grid>

                  <Grid container item direction='column' alignContent='center' style={{ width: '600px' }}>
                    {/* Peta */}
                    <Grid container item>
                      {/* Kiri atas */}
                      <Grid container item xs='3' direction='column' justify='space-between' >
                        {/* Baris 1 */}
                        <Grid container justify='space-between' >
                          <TableButton id='1' capacity='2' orientation='vertical' />
                          <TableButton id='2' capacity='2' orientation='vertical' />
                          <TableButton id='3' capacity='2' orientation='vertical' />
                        </Grid>

                        {/* Baris 2 */}
                        <Grid container justify='space-between' style={{ marginTop: '32px' }}>
                          <TableButton id='4' capacity='2' orientation='vertical' />
                          <TableButton id='5' capacity='2' orientation='vertical' />
                          <TableButton id='6' capacity='2' orientation='vertical' />
                        </Grid>
                      </Grid>

                      {/* Kanan atas */}
                      <Grid container item xs='9' direction='column' justify='space-between' style={{ paddingLeft: '32px' }}>
                        {/* Baris 1 */}
                        <Grid container item justify='space-between' >
                          <TableButton id='1' capacity='1' />
                          <TableButton id='2' capacity='1' />
                          <TableButton id='3' capacity='1' />
                          <TableButton id='4' capacity='1' />
                          <TableButton id='5' capacity='1' />
                          <TableButton id='6' capacity='1' />
                        </Grid>

                        {/* Baris 2 */}
                        <Grid container item justify='space-between' >
                          <TableButton id='7' capacity='2' orientation='horizontal' />
                          <TableButton id='8' capacity='2' orientation='horizontal' />
                          <TableButton id='9' capacity='2' orientation='horizontal' />
                          <TableButton id='10' capacity='2' orientation='horizontal' />
                        </Grid>

                        {/* Baris 3 */}
                        <Grid container item justify='space-between' >
                          <TableButton id='1' capacity='4' />
                          <TableButton id='2' capacity='4' />
                          <TableButton id='3' capacity='4' />
                          <TableButton id='4' capacity='4' />
                        </Grid>
                      </Grid>

                      {/* Bawah */}
                      <Grid container item xs='12' justify='space-between' style={{ marginTop: '32px' }}>
                        <TableButton id='5' capacity='4' />
                        <TableButton id='6' capacity='4' />
                        <TableButton id='7' capacity='4' />
                        <TableButton id='8' capacity='4' />
                        <TableButton id='9' capacity='4' />
                        <TableButton id='10' capacity='4' />
                      </Grid>
                    </Grid>

                    {/* Tombol-tombol */}
                    <Grid container item justify='space-between' style={{ margin: '24px 0 8px 0' }}>

                      <Grid item>
                        {(isObjEmpty(selectedTables)) ? (
                          <Button
                            variant='contained'
                            className={classes.themebg}
                            onClick={handleSync}
                          >
                            Reload
                          </Button>
                        ) : (
                            null
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Tombol Konfirmasi dan Pesan */}
              <Grid container item justify='center' style={{ marginTop: '16px', height: '125px' }} >
                <Paper style={{ display: 'flex', alignContent: 'center' }}>

                  {(isObjEmpty(selectedTables)) ? (
                    <Grid container item alignContent='center'>
                      <Grid container item style={{ margin: '0 24px 0 24px' }}>
                        <Hidden smUp>
                          <Typography align='center' style={{ fontSize: '0.8em' }}>
                            Untuk mengubah status meja menjadi kosong, <br />
                            klik tombol meja abu-abu (bisa lebih dari 1), lalu klik tombol ubah.
                          </Typography >
                        </Hidden>
                        <Hidden xsDown>
                          <Typography align='center'>
                            Untuk mengubah status meja menjadi kosong, <br />
                            klik tombol meja abu-abu (bisa lebih dari 1), lalu klik tombol ubah.
                          </Typography >
                        </Hidden>
                      </Grid>
                    </Grid>

                  ) : (

                      <Grid container item>

                        <Grid container item xs='12' justify='center' alignContent='center' style={{ marginTop: '8px' }}>
                          <Typography variant='h6' align='center'>
                            Ubah status meja yang terpilih menjadi kosong?
                          </Typography>
                        </Grid>

                        <Grid container item xs='12' justify='center' style={{ margin: '16px 0 8px 0' }}>
                          <Grid item>
                            <Button
                              variant='contained'
                              className={classes.themebg}
                              style={{ marginRight: '16px' }}
                              onClick={handleCancelClick}
                            >
                              Batal
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant='contained'
                              className={classes.themebg}
                              onClick={handleConfirmClick}
                            >
                              Ubah
                            </Button>
                          </Grid>
                        </Grid>
                        
                      </Grid>
                    )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        )
      ) : (
          null
      )}
    </div>
  )
}

export default Pelapor;