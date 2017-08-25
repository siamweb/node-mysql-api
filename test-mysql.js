var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ionic'
});

connection.connect()

connection.query('SELECT * FROM users', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].firstname)
})

connection.end()