var express = require('express');
var router = express.Router();
var path = require('path');
var conn = require("../config/db")();

/* GET home page. */
router.get('/user', function(req, res, next) {
    var sql = "SELECT * from user";
    conn.query(sql, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results);
            res.send(JSON.stringify(results));
        }
    });
    // res.sendFile(path.join(__dirname, '../public', 'temp.html'))
});

module.exports = router;
