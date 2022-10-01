import PocketBase from 'pocketbase';

// const pocketbaseUrl = 'http://127.0.0.1:8090/';
const pocketbaseUrl = 'http://192.168.1.230:8090/';
// const pocketbaseUrl = 'http://172.28.240.1:8090/';
const pocketbaseInstance = new PocketBase(pocketbaseUrl);

export default pocketbaseInstance;
