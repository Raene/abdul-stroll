import {Connection, connect, connection} from 'mongoose';
import Config from '../helpers/config';

//create connection and export as a singleton
connect(Config.DB_URL)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch(err => {
    console.log(`Error connecting to MongoDB`, err);
  });
const conn: Connection = connection;

export default conn;
