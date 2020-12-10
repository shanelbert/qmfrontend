import Axios from 'axios';

const server = 'http://localhost:5000';


function createQueuer(data) {
	return Axios.post(server + '/pengantri', data);
}

function getAllQueuer() {
	return Axios.get(server + '/pengantri');
}

function deleteQueuer(id) {
	return Axios.delete(server + `/pengantri?id=${id}`);
}

function getAllTable() {
	return Axios.get(server + '/meja');
}

function setEmptyTable(id, kapasitas) {
	return Axios.put(server + `/meja/kosong?id=${id}&kapasitas=${kapasitas}`);
}

function setTablesStatus(data) {
	return Axios.put(server + '/meja', data);

}

export { createQueuer, getAllQueuer, deleteQueuer, getAllTable, setEmptyTable, setTablesStatus};