import React from 'react';
import * as helper from './helper';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MuiAlert from "@material-ui/lab/Alert";

import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import HelpIcon from '@material-ui/icons/Help';

function Pengatur() {
  let base = 8;
  let short = base * 4 + "px";
  let long = base * 8 + "px";

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: "unset",
    },
    table1seat: {
      width: short,
      height: short
    },
    table1seatEmpty: {
      backgroundColor: "#049F90",
      color: "white",
      '&$disabled': {
        backgroundColor: "#049F90"
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
      backgroundColor: "#FD7D2E",
      color: "white",
      '&$disabled': {
        backgroundColor: "#FD7D2E"
      }
    },
    table4seat: {
      width: long,
      height: long
    },
    table4seatEmpty: {
      backgroundColor: "#B2417C",
      color: "white",
      '&$disabled': {
        backgroundColor: "#B2417C"
      }
    },
    disabled: {
      //(meskipun kosong, ini harus ditambahkan)
    },
    fab: {
      position: "fixed",
      right: "3vw",
      bottom: "3vh",
      zIndex: 1
    },
    themebg: {
      backgroundColor: "#673ab7",
      color: 'white'
    }
  }));

  const [valueNama, setValueNama] = React.useState("");
  const [valueJumlah, setValueJumlah] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [tables, setTables] = React.useState({});
  const [selectedQueuer, setSelectedQueuer] = React.useState(null);
  const [selectedTables, setSelectedTables] = React.useState({});

  function c(string) {
    console.log(string);
  }

  const classes = useStyles();

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
    // jika baris diklik dan meja ini sedang kosong
    if (selectedQueuer) {
      if (!isObjEmpty(tables) && !tables[capacity][id]) {
        disabled = false;
      }
    } else {
      if (!isObjEmpty(tables) && tables[capacity][id]) {
        disabled = false;
      }
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
        randomvalue="random"
        variant="contained"
        disableTouchRipple
        disabled={disabled}
        classes={{ root: className, disabled: classes.disabled }}
        onClick={() => { handleTButtonClick() }}

      >
        {(selectedTables[tableCode]) ? (
          (tables[capacity][id]) ? (
            <RemoveIcon />
          ) : (
              <CheckIcon />
            )
        ) : (
            tableCode
          )}
      </Button>
    );
  }

  const allTableTemplate = React.useRef({});
  React.useEffect(() => {
    helper.getAllQueuer().then((res) => {
      setRows(res.data);
    });

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

  }, []);

  const [snackbarContent, setSnackbarContent] = React.useState("");
  const [severity, setSeverity] = React.useState("info");
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

  const [openDialog, setOpenDialog] = React.useState(false);

  function handleOpenDialog() {
    setOpenDialog(true);
  };

  function handleCloseDialog() {
    setOpenDialog(false);
  };


  function handleSync() {
    helper.getAllQueuer().then((resQueuer) => {
      helper.getAllTable().then((resTable) => {
        let alltable = { ...allTableTemplate.current };
        resTable.data.forEach((meja) => {
          alltable[meja.kapasitas][meja.id] = meja.status;
        });
        setRows(resQueuer.data);
        setTables(alltable);
        handleOpenSnackbar("success", "Daftar pengantri dan peta status meja berhasil diperbarui");

      }).catch(() => {
        handleOpenSnackbar('error', 'Gagal memuat isi tabel meja');
      });

    }).catch(() => {
      handleOpenSnackbar('error', 'Gagal memuat isi tabel pengantri');
    });

  }

  function validateDataPengantri() {
    let test = [
      (valueNama !== ""),
      (valueJumlah !== ""),

      (!isNaN(Number(valueJumlah))),
      (Number.isInteger(Number(valueJumlah))),
      (Number(valueJumlah) > 0),

    ];

    // jika salah satu ekspresi di test bernilai false, isValid akan diset false dan loop akan dihentikan
    let isValid = true;
    test.every((expression) => {
      if (expression === false) {
        isValid = false;
      }
      return expression;
    })

    return isValid;
  }

  function handleSubmit() {
    if (validateDataPengantri()) {
      let data = {
        namawakil: valueNama,
        jumlah: Number(valueJumlah)
      };


      helper.createQueuer(data).then(() => {
        helper.getAllQueuer().then((res) => {
          setRows(res.data);
          handleOpenSnackbar('success', 'Pengantri berhasil ditambahkan!');
        }).catch(() => {
          handleOpenSnackbar('error', 'Gagal memuat isi tabel pengantri yang telah ditambahkan');
        });
        setValueNama('');
        setValueJumlah('');
      }).catch(() => {
        handleOpenSnackbar('error', 'Pengantri gagal ditambahkan');
      });
    } else {
      handleOpenSnackbar('error', 'Data pengantri tidak valid');
    }
  }


  function handleRowClick(e, queuerId) {
    e.stopPropagation();
    setSelectedTables({});
    setSelectedQueuer(queuerId);
  }

  function handleCancelClick() {
    setSelectedTables({});
    setSelectedQueuer(null);
  }

  function handleConfirmClick(status) {
    let data = { status: status, meja: Object.values(selectedTables) };
    if (status) {
      c(data);
      helper.setTablesStatus(data).then(() => {
        helper.deleteQueuer(selectedQueuer).then(() => {
          helper.getAllQueuer().then((resQueuer) => {
            helper.getAllTable().then((resTable) => {
              let alltable = { ...allTableTemplate.current };
              resTable.data.forEach((meja) => {
                alltable[meja.kapasitas][meja.id] = meja.status;
              });
              setRows(resQueuer.data);
              setTables(alltable);
              setSelectedQueuer(null);
              setSelectedTables({});
              handleOpenSnackbar("success", "Status meja berhasil diubah");
            }).catch(() => {
              handleOpenSnackbar('error', 'Gagal memuat isi tabel meja');
            });
          }).catch(() => {
            handleOpenSnackbar('error', 'Gagal memuat isi tabel pengantri');
          });
        }).catch(() => {
          handleOpenSnackbar('error', 'Gagal menghapus pengantri');
        });
      }).catch(() => {
        handleOpenSnackbar('error', 'Gagal mengubah status meja');
      });
    } else {
      helper.setTablesStatus(data).then(() => {
        helper.getAllTable().then((resTable) => {
          let alltable = { ...allTableTemplate.current };
          resTable.data.forEach((meja) => {
            alltable[meja.kapasitas][meja.id] = meja.status;
          });
          setTables(alltable);
          setSelectedTables({});
          handleOpenSnackbar("success", "Status meja berhasil diubah");
        }).catch(() => {
          handleOpenSnackbar('error', 'Gagal memuat isi tabel meja');
        });
      }).catch(() => {
        handleOpenSnackbar('error', 'Gagal mengubah status meja');
      });
    }
  }
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Grid container style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={(event, reason) => { handleCloseSnackbar(event, reason) }}>
        <MuiAlert variant="filled" icon={false} severity={severity} onClose={(event, reason) => { handleCloseSnackbar(event, reason) }}>
          {snackbarContent}
        </MuiAlert>
      </Snackbar>
      <Fab color="primary" size="medium" className={classes.fab} onClick={handleOpenDialog}>
        <HelpIcon />
      </Fab>
      <Dialog open={openDialog} onClose={handleCloseDialog} disableScrollLock={true}>
        <DialogContent>
          <DialogContentText>
            <b>
              Untuk menempatkan pengantri ke meja,
            </b>
            <ul style={{ marginBottom: "0" }}>
              <li>
                Klik baris pada daftar pengantri
              </li>
              <li>
                Klik tombol meja berwarna (bisa lebih dari 1)
              </li>
              <li>
                Klik tombol ubah
              </li>
            </ul>
            <br />
            <Divider />
            <br />
            <b>
              Untuk mengubah status meja menjadi kosong,
            </b>
            <ul>
              <li>
                Klik tombol meja abu-abu (bisa lebih dari 1)
              </li>
              <li>
                Klik tombol ubah
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      {/* Bagian tidak fixed (untuk tabel) */}
      <Grid container item justify="center" style={{ margin: "16px 0 16px 0" }} >
        {/* Daftar Pengantri */}
        <Grid container item xs="5" style={{ paddingRight: "24px", zIndex: "1" }}>
          <Paper style={{ padding: "0 24px 24px 24px" }}>
            <Grid container item direction="column" alignContent="center">
              {/* Judul */}
              <Grid container item justify="center" style={{ margin: "8px 0 8px 0" }}>
                <Typography variant="h4">Daftar Pengantri</Typography>
              </Grid>

              {/* Tabel */}
              <Grid item>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow className={classes.themebg} >
                        <TableCell style={{ color: "inherit" }}>ID</TableCell>
                        <TableCell style={{ color: "inherit" }}>Nama Perwakilan</TableCell>
                        <TableCell style={{ color: "inherit" }}>Jumlah Orang</TableCell>
                        <TableCell style={{ color: "inherit" }}>Waktu Mulai Mengatri</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => {
                        return (
                          <TableRow
                            key={row.id}
                            hover
                            onClick={(e) => { handleRowClick(e, row.id) }}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.namawakil}</TableCell>
                            <TableCell>{row.jumlah}</TableCell>
                            <TableCell>{row.waktumulai}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Daerah kosong (ini akan tertutupi oleh peta dan form) */}
        <Grid container item xs="5" style={{ zIndex: "0" }} />
      </Grid>

      {/* Bagian fixed (untuk peta dan form) */}
      <Grid container item justify="center" style={{ padding: "16px 0 16px 0", position: "fixed", height: "100vh" }}>
        {/* Daerah kosong (ini akan tertutupi oleh tabel) */}
        <Grid container item xs="5" style={{ zIndex: "0" }} />

        {/* Peta dan Form */}
        <Grid container item xs="5" alignContent="space-between" style={{ zIndex: "1" }}>
          {/* Peta Status Meja */}
          <Grid container item>
            <Paper style={{ padding: "0 8px 0 8px" }}>
              {/* Judul */}
              <Grid container item justify="center" style={{ margin: "8px 0 8px 0" }}>
                <Typography variant="h4">Peta Status Meja</Typography>
              </Grid>

              <Grid container item direction="column" alignContent="center">
                {/* Peta */}
                <Grid container item>
                  {/* Kiri atas */}
                  <Grid container item xs="3" direction="column" justify="space-between" >
                    {/* Baris 1 */}
                    <Grid container justify="space-between" >
                      <TableButton id="1" capacity="2" orientation="vertical" />
                      <TableButton id="2" capacity="2" orientation="vertical" />
                      <TableButton id="3" capacity="2" orientation="vertical" />
                    </Grid>

                    {/* Baris 2 */}
                    <Grid container justify="space-between" style={{ marginTop: "32px" }}>
                      <TableButton id="4" capacity="2" orientation="vertical" />
                      <TableButton id="5" capacity="2" orientation="vertical" />
                      <TableButton id="6" capacity="2" orientation="vertical" />
                    </Grid>
                  </Grid>

                  {/* Kanan atas */}
                  <Grid container item xs="9" direction="column" justify="space-between" style={{ paddingLeft: "32px" }}>
                    {/* Baris 1 */}
                    <Grid container item justify="space-between" >
                      <TableButton id="1" capacity="1" />
                      <TableButton id="2" capacity="1" />
                      <TableButton id="3" capacity="1" />
                      <TableButton id="4" capacity="1" />
                      <TableButton id="5" capacity="1" />
                      <TableButton id="6" capacity="1" />
                    </Grid>

                    {/* Baris 2 */}
                    <Grid container item justify="space-between" >
                      <TableButton id="7" capacity="2" orientation="horizontal" />
                      <TableButton id="8" capacity="2" orientation="horizontal" />
                      <TableButton id="9" capacity="2" orientation="horizontal" />
                      <TableButton id="10" capacity="2" orientation="horizontal" />
                    </Grid>

                    {/* Baris 3 */}
                    <Grid container item justify="space-between" >
                      <TableButton id="1" capacity="4" />
                      <TableButton id="2" capacity="4" />
                      <TableButton id="3" capacity="4" />
                      <TableButton id="4" capacity="4" />
                    </Grid>
                  </Grid>

                  {/* Bawah */}
                  <Grid container item xs="12" justify="space-between" style={{ marginTop: "32px" }}>
                    <TableButton id="5" capacity="4" />
                    <TableButton id="6" capacity="4" />
                    <TableButton id="7" capacity="4" />
                    <TableButton id="8" capacity="4" />
                    <TableButton id="9" capacity="4" />
                    <TableButton id="10" capacity="4" />
                  </Grid>
                </Grid>

                {/* Tombol-tombol */}
                <Grid container item justify="space-between" style={{ margin: "24px 0 8px 0" }}>

                  <Grid item>
                    {(!selectedQueuer && isObjEmpty(selectedTables)) ? (
                      <Button
                        variant="contained"
                        className={classes.themebg}
                        onClick={handleSync}
                      >
                        Reload
                      </Button>
                    ) : (
                        null
                      )
                    }
                  </Grid>
                  {(selectedQueuer) ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        className={classes.themebg}
                        style={{ marginRight: "16px" }}
                        onClick={handleCancelClick}
                      >
                        Batal
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.themebg}
                        onClick={() => { handleConfirmClick(true) }}
                      >
                        Ubah
                        </Button>
                    </Grid>
                  ) : (
                      (!isObjEmpty(selectedTables)) ? (
                        <Grid item>
                          <Button
                            variant="contained"
                            className={classes.themebg}
                            style={{ marginRight: "16px" }}
                            onClick={handleCancelClick}
                          >
                            Batal
                      </Button>
                          <Button
                            variant="contained"
                            className={classes.themebg}
                            onClick={() => { handleConfirmClick(false) }}
                          >
                            Ubah
                        </Button>
                        </Grid>
                      ) : (
                          null
                        )
                    )
                  }
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Tambah Pengantri */}
          <Grid container item>
            <Paper>
              <Grid container item justify="center">
                <Grid item xs="3" />

                {/* Form */}
                <Grid container item xs="6">
                  <Grid container item justify="center" style={{ margin: "8px 0 8px 0" }}>
                    <Grid item >
                      <Typography variant="h6">Tambah Pengantri</Typography>
                    </Grid>
                  </Grid>

                  <Grid container item justify="center" >
                    <Grid item justify="center">
                      <TextField
                        variant="outlined"
                        label="Nama Perwakilan"
                        size="small"
                        value={valueNama}
                        onChange={(e) => { setValueNama(e.target.value) }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container item justify="center" >
                    <Grid item>
                      <TextField
                        variant="outlined"
                        label="Jumlah Orang"
                        size="small"
                        style={{ margin: "24px 0 16px 0" }}
                        value={valueJumlah}
                        onChange={(e) => { setValueJumlah(e.target.value) }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Tombol submit */}
                <Grid container item alignContent="flex-end" xs="3" style={{ margin: "0 0 16px 0" }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      className={classes.themebg}
                      onClick={() => { handleSubmit() }}
                    >
                      Tambah
                      </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Pengatur;