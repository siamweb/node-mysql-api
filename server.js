const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 

let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ionic'
});
connection.connect();


app.get('/', function (req, res) {

   res.send('Hello Ionic !')

});


app.get('/users', function (req, res) {

    connection.query('SELECT * FROM users', function (err, rows, fields) {
        if (err){
          throw err;
          return res.json({ "success": false, "msg": "ไม่สามารถดึงข้อมูลสมาชิกได้", "error": err })
        }

        res.status(200).send({ "success": true, "result": rows });
        //res.send(rows);     


        //console.log('The solution is: ', rows[0].firstname)
    });
    //connection.end();
});


app.post('/users', function (req, res){
    
    if (!req.body.firstname) {
      return res.status(400).send({ "success": false, "msg": "กรุณากรอกชื่อ" });
    }
    let sql = "INSERT INTO users (firstname, lastname, tel) VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.tel+"')";
    connection.query(sql, function (err, result) {

    if (err) {
      throw err;
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "ไม่สามารถสร้างข้อมูลสมาชิกได้", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'สร้างข้อมูลสมาชิกเรียบร้อย' });

  });

});

app.delete('/users/:userId', function (req, res){
    
    //let sql = "DELETE FROM users WHERE id="+parseInt(req.body.id);

    let userId = req.params.userId;
    if (!userId || userId === "") {
      return res.json({ "success": false, "msg": "กรุณาระบุหมายเลขสมาชิกที่ต้องการลบ", "error": err });
    }


    let sql = "DELETE FROM users WHERE id="+parseInt(userId);
    connection.query(sql, function (err, result) {

    if (err){
      throw err;
      return res.json({ "success": false, "msg": "ไม่สามารถลบข้อมูลสมาชิกได้", "error": err });
    } 
    console.log("Number of records deleted: " + result.affectedRows);
    res.status(200).json({ "success": true, "msg": "ลบข้อมูลสมาชิกเรียบร้อย" });

  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});