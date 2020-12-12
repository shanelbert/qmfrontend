import Axios from 'axios';

const server = 'http://localhost:5000';

function getConfig() {
	return { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } };
}

function createQueuer(data) {
	return Axios.post(server + '/pengantri', data, getConfig());
}

function getAllQueuer() {
	return Axios.get(server + '/pengantri', getConfig());
}

function deleteQueuer(id) {
	return Axios.delete(server + `/pengantri?id=${id}`, getConfig());
}

function getAllTable() {
	return Axios.get(server + '/meja', getConfig());
}

function setTablesStatus(data) {
	return Axios.put(server + '/meja', data, getConfig());
}

function checkAuth() {
	return Axios.get(server + '/auth', getConfig());
}

function getToken(code) {
	return Axios.post(server + `/token?code=${code}`);
}

function getGoogleLoginURL() {
	return Axios.get(server + '/url');
}

function upsertUser(data) {
	return Axios.post(server + '/karyawan', data, getConfig());
}

export { createQueuer, getAllQueuer, deleteQueuer, getAllTable, setTablesStatus, checkAuth, getToken, getGoogleLoginURL, upsertUser };