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

router.post('/checkdoc', function(req,res, next){
    console.log(req.body);
    let sql = "SELECT C.*, D.* FROM (SELECT A.id as doc_num, A.grade, A.user_id, B.typename, B.content, B.date, B.company, B.title, B.watermark FROM ts.doc as A LEFT OUTER JOIN (SELECT * FROM ts.doctype) as B on (A.doctype = B.id)"
        +"WHERE A.user_id = " + req.body.id + ") as C LEFT OUTER JOIN (SELECT * FROM ts.user) as D on (C.user_id = D.id);";
    conn.query(sql, function(err,results1){
        if(err){
            console.log(err);
        }
        else{
            console.log(results1);
            res.send(results1);
        }
    })
});

module.exports = router;
