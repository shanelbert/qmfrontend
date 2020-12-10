// import logo from './logo.svg';
// import './App.css';
import { Dialog, Fab, makeStyles, Button, Grid, Paper, Typography, FormControl, InputLabel, 
  Input, FormHelperText, TextField, Snackbar, ClickAwayListener, Hidden, DialogTitle, 
  DialogContentText, DialogActions, DialogContent, Divider  } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as helper from './helper';
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
      // boxSizing: "border-box"
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

    // table2seatVerticalRoot: {
    //   minWidth: "unset",
    //   width: short,
    //   height: long,
    //   // background: "#2196f3",
    //   background: "#FD7D2E",
    //   color: "white"
    // },
    // table2seatHorizontalRoot: {
    //   minWidth: "unset",
    //   width: long,
    //   height: short,
    //   // background: "#2196f3",
    //   background: "#FD7D2E",
    //   color: "white"
    // },
    // table4seatRoot: {
    //   minWidth: "unset",
    //   width: long,
    //   height: long,
    //   // background: "#e91e63",
    //   background: "#B2417C",
    //   color: "white"
    // }, 
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
    

    // };
    const [valueNama, setValueNama] = React.useState("");
    const [valueJumlah, setValueJumlah] = React.useState("");
    
    const [rows, setRows] = React.useState([]);
    const [tables, setTables] = React.useState({});
  const [selectedQueuer, setSelectedQueuer] = React.useState(null);
  const [selectedTables, setSelectedTables] = React.useState({});
  // function rgb() {
  //   return { backgroundColor: "initial" }
  //   // return { backgroundColor: `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})` };
  // }
  // function createData(id, namawakil, jumlah, waktumulai) {
  //   // manfaat pakai fungsi ini: tidak perlu ngetik keys untuk object hasil  
  //   return { id, namawakil, jumlah, waktumulai };
  // }
  function c(string) {
    console.log(string);
  }

  const classes = useStyles();
  
  // function handleTButtonClick(isSelected, id, capacity) {
  //   // const charToCapacityMap = { 'A': 1, "B": 2, "C": 4 };
  //   const capacityToCharMap = { 1: 'C', 2: 'B', 4: 'A' };

  //   let next = !isSelected;
  //   let temp = {...selectedTables};
  //   if (next) {
  //     temp[capacityToCharMap[capacity] + id] = { id: Number(id), kapasitas: capacity };
  //     setSelectedTables(temp);
  //   } else {
  //     delete temp[capacityToCharMap[capacity] + id];
  //     setSelectedTables(temp);
  //   }
    
  //   return (next);
  // }

  function isObjEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
  }

  function TableButton(props) {
    let {capacity, id, orientation} = props;
    const capacityToCharMap = { '1': 'C', '2': 'B', '4': 'A' };
    let tableCode = `${capacityToCharMap[Number(capacity)]}${id}`;
    let className = classes.table;
    // const [isSelected, setSelected] = React.useState(false);

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
        // className += ` ${classes.table1seatEmpty}`;

        if (capacity === '1') {
          className += ` ${classes.table1seatEmpty}`
        } else if (capacity === '2') {
          // if (orientation === 'vertical') {
            className += ` ${classes.table2seatEmpty}`

          // } else {
          //   className += ` ${classes.table2seatHorizontal}`
          // }
        } else {
          className += ` ${classes.table4seatEmpty}`
        }

        // c('setcolor');
      }
    }

    let disabled = true;
    // jika baris diklik dan meja ini sedang kosong
    // console.log(isAnyRowSelected)
    if (selectedQueuer) {
      if (!isObjEmpty(tables) && !tables[capacity][id]) {
        disabled = false;
      }
    } else {
      if (!isObjEmpty(tables) && tables[capacity][id]) {
        disabled = false;
      }
    }
    
    // const charToCapacityMap = { 'A': 1, "B": 2, "C": 4 };
    function handleTButtonClick() {

      // let next = !isSelected;
      let temp = { ...selectedTables };
      // c(isSelected);
      if (temp[tableCode] === undefined) {
        temp[tableCode] = { id: Number(id), kapasitas: capacity };
        setSelectedTables(temp);
        // setSelected(next)
      } else {
        delete temp[tableCode];
        setSelectedTables(temp);
        // setSelected(next)
      }

      // return (next);
    }

    return ( 
      <Button
        randomvalue="random"
        variant="contained"
        disableTouchRipple
        disabled={disabled}
        classes={{ root: className, disabled: classes.disabled }}
        // onClick={(e) => { e.target.classList.add(classes.bd)}}
        // onClick={() => { setSelected(!isSelected); selectedTables.current[tableCode] = {id: id, kapasitas: 1}}}
        // onClick={() => { setSelected(handleTButtonClick(isSelected, id, capacity))}}
        onClick={() => { handleTButtonClick()}}

        >
          {/* {(isSelected) ? ( */}
        {(selectedTables[tableCode]) ? (
            (tables[capacity][id]) ? (
              <RemoveIcon/>
              ) : (
                <CheckIcon/>
              )
          ) : (
            tableCode
          )}
      </Button>
    );
  }
  
  // function T2VerticalButton(props) {
  //   return (
  //     <Button
  //       variant="contained"
  //       classes={{ root: classes.table2seatVerticalRoot }}
  //       // status={tables[2][id].status}
  //       // isRowSelected={rowSelected}
  //       >
  //       B{props.tableId}
  //     </Button>
  //   );
  // }
  // function T2HorizontalButton(props) {
  //   return (
  //     <Button
  //       variant="contained"
  //       classes={{ root: classes.table2seatHorizontalRoot }}
  //       // status={tables[2][id].status}
  //       // isRowSelected={rowSelected}
  //       >
  //       B{props.tableId}
  //     </Button>
  //   );
  // }
  // function T4Button(props) {
  //   // const [status, setStatus] = React.useState('false');
  //   // const [clickable, setClickable] = React.useState('false');
  //   return (
  //     <Button
  //       variant="contained"
  //       classes={{ root: classes.table4seatRoot }}
  //       // status={tables[4][id].status}
  //       // isRowSelected={rowSelected}
  //       >
  //       A{props.tableId}
  //     </Button>
  //   );
  // }



  const allTableTemplate = React.useRef({});
  React.useEffect(() => {
    // let newrows = [];
    // for (let i = 1; i <= 10; i++) {
    //   newrows.push(createData(i, "Elbert Shan", Math.round(Math.random() * 10), "12:12:12"))

      // newrows.push(createData(i, "Elbert", Math.round(Math.random() * 10), new Date(Date.now()).toISOString()))
    // }
    
    // setRows(newrows);
    helper.getAllQueuer().then((res) => {
      // console.log(res.data)
      setRows(res.data);
    });

    helper.getAllTable().then((res) => {      
      let capacityRange = new Set();
      // c(res.data);
      res.data.forEach((meja) => {
        capacityRange.add(meja.kapasitas);
      });

      let alltable = {}
      capacityRange.forEach((cap) => {
        alltable[cap] = {};
      });
      allTableTemplate.current = {...alltable};

      res.data.forEach((meja) => {
        alltable[meja.kapasitas][meja.id] = meja.status;
      });
      // console.log(alltable);
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
        // setSelectedQueuer(null);
        // setSelectedTables({});
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
          }).catch(() =>{
            handleOpenSnackbar('error', 'Gagal memuat isi tabel pengantri yang telah ditambahkan');
          });
          setValueNama('');
          setValueJumlah('');
          // menyamakan isi tabel frontend dengan database tanpa perlu membuat request data ke database
          // let newRows = [...rows];
          // let id = (newRows.length === 0) ? 1 : (newRows[newRows.length - 1].id + 1);
          // let timestamp = new Date(Date.now()).toUTCString();
          // newRows.push(
          //   createData(newRows[newRows.length - 1].id + 1, "Elbert", Math.round(Math.random() * 10), new Date(Date.now()).toUTCString()));
          // setRows(newRows);

      }).catch(() => {
        handleOpenSnackbar('error', 'Pengantri gagal ditambahkan');
      });
    } else {
      handleOpenSnackbar('error', 'Data pengantri tidak valid');
    }

  }


  // function handleClickAway(e) {
  //   if (e.target.tagName !== "SPAN" && e.target.tagName !== "BUTTON") {
  //     setSelectedQueuer(null);
  //   } else { // jika target adalah span atau button     
  //     if (e.target.tagName === "BUTTON") {  // jika target adalah button
  //       if (e.target.getAttribute("class") && e.target.getAttribute("class").includes(classes.table)) {
  //         setSelectedQueuer(null);
  //       }
  //     } else { //jika target adalah span
  //       if (e.target.closest('button').getAttribute("class").includes(classes.table)) {
  //         setSelectedQueuer(null);
  //       }
  //     }
  //   }
  // };

  function handleRowClick(e, queuerId) {
    // if (document.activeElement !== textRef.current) {
      
    // }
    e.stopPropagation();
    setSelectedTables({});
    setSelectedQueuer(queuerId);
  }

  function handleCancelClick() {
    // c(selectedTables.current); 
    setSelectedTables({});
    setSelectedQueuer(null);
  }

  function handleConfirmClick(status) {
    // c(selectedTables.current);
    let data = { status: status, meja: Object.values(selectedTables)};
    if (status) {
      c(data);
      helper.setTablesStatus(data).then(() => {
        // console.log(res.data);
        helper.deleteQueuer(selectedQueuer).then(() => {
          // console.log(alltable);
          helper.getAllQueuer().then((resQueuer) => {
            // console.log(res.data)
            
            helper.getAllTable().then((resTable) => {
              let alltable = {...allTableTemplate.current};
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
  return ( // BK
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
    <Grid container style={{ background: "#f5f5f5", minHeight: "100vh"}}>
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
            <br/>
            <Divider/>
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
                        <TableCell style={{ color: "inherit"}}>ID</TableCell>
                        <TableCell style={{ color: "inherit" }}>Nama Perwakilan</TableCell>
                        <TableCell style={{ color: "inherit" }}>Jumlah Orang</TableCell>
                        <TableCell style={{ color: "inherit" }}>Waktu Mulai Mengatri</TableCell>
                      </TableRow>
                    </TableHead>
                        {/* <ClickAwayListener onClickAway={(e) => { handleClickAway(e) }}> */}
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
                    {/* </ClickAwayListener> */}

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
                      <TableButton id="1" capacity="2" orientation="vertical"/>
                      <TableButton id="2" capacity="2" orientation="vertical"/>
                      <TableButton id="3" capacity="2" orientation="vertical" />
                    </Grid>

                    {/* Baris 2 */}
                    <Grid container justify="space-between" style={{ marginTop: "32px" }}>
                      <TableButton id="4" capacity="2" orientation="vertical"/>
                      <TableButton id="5" capacity="2" orientation="vertical"/>
                      <TableButton id="6" capacity="2" orientation="vertical"/>
                    </Grid>
                  </Grid>

                  {/* Kanan atas */}
                  <Grid container item xs="9" direction="column" justify="space-between" style={{ paddingLeft: "32px" }}>
                    {/* Baris 1 */}
                    <Grid container item justify="space-between" >
                      <TableButton id="1" capacity="1"/>
                      <TableButton id="2" capacity="1"/>
                      <TableButton id="3" capacity="1"/>
                      <TableButton id="4" capacity="1"/>
                      <TableButton id="5" capacity="1"/>
                      <TableButton id="6" capacity="1"/>
                    </Grid>

                    {/* Baris 2 */}
                    <Grid container item justify="space-between" >
                      <TableButton id="7" capacity="2"  orientation="horizontal" />
                      <TableButton id="8" capacity="2" orientation="horizontal"/>
                      <TableButton id="9" capacity="2"  orientation="horizontal"/>
                      <TableButton id="10" capacity="2"  orientation="horizontal" />
                    </Grid>

                    {/* Baris 3 */}
                    <Grid container item justify="space-between" >
                      <TableButton id="1" capacity="4" />
                      <TableButton id="2" capacity="4" />
                      <TableButton id="3" capacity="4"/>
                      <TableButton id="4" capacity="4"/>
                    </Grid>
                  </Grid>

                  {/* Bawah */}
                  <Grid container item xs="12" justify="space-between" style={{ marginTop: "32px" }}>
                    <TableButton id="5" capacity="4"/>
                    <TableButton id="6" capacity="4"/>
                    <TableButton id="7" capacity="4"/>
                    <TableButton id="8" capacity="4"/>
                    <TableButton id="9" capacity="4"/>
                    <TableButton id="10" capacity="4"/>
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
                  {/* <Grid>
                    <Typography>
                      Klik baris pada daftar pengantri untuk mulai menempatkan pengantri atau klik tombol meja abu-abu untuk mulai mengosongkan meja
                    </Typography>
                  </Grid> */}
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
                      onClick={() => {handleConfirmClick(true)}}
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