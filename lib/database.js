const mysql = require('mysql');
const sqlCredential = require('./credentials').sqlCredential;

// const connection = mysql.createConnection(sqlCredentials);
var connection = mysql.createConnection(sqlCredential);


function handleDisconnect() {
  connection = mysql.createConnection(sqlCredential); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      console.log('attempting to connectBack')
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      // throw err;                                  // server variable configures this)
      console.log('Database error. engg... :( ')

    }
  });
}

handleDisconnect();

///////////////////////////////////////////////////////////////

function connectDB(){
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('  (Database connection established.. ID: ' + connection.threadId+')');
  });
}

function queryDb(queryString, callback){
  connection.query(queryString, function(err, rows, fields){
    if (err) {
      console.log('error alert. error alert.');
      // queryDb(queryString, callback);
    } else callback('success');
    })
}

function insertDb(queryString, obj, callback){
  connection.query(queryString, function(err, rows, fields){
    if (err) {
      console.log('error alert. error alert. retrying...');
      // queryDb(queryString, callback);
      console.log(queryString);
    } else callback('success', obj);
    })
}

function queryDbGetSomething(queryString, callback){
  connection.query(queryString, function(err, rows, fields){
    if (err) {
      console.log('error alert. error alert. retrying...');
      queryDbGetSomething(queryString, callback);
    } else callback(rows);
    });
}

function updateDb(queryString, callback){
  connection.query(queryString, function(err, rows, fields){
    if (err) { console.log('error alert. error alert. retrying...');
            updateDb(queryString, callback);
    } else {
      callback(rows);
    }
  })
}

module.exports = {
    connectDB :   connectDB,
    // outDB     :   outDB,
    queryDb   :   queryDb,
    updateDb  :   updateDb,
    queryDbGetSomething: queryDbGetSomething,
    insertDb  : insertDb
};
