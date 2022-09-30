import PocketBase from 'pocketbase';

const pocketbaseUrl = 'http://127.0.0.1:8090/';
const pocketbaseInstance = new PocketBase(pocketbaseUrl);

export default pocketbaseInstance;
