var express = require('express');
var router = express.Router();
var conn = require('../config/db')();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(req.body.id);
  var user = {
      id: req.body.id,
      pw: req.body.pw
  }
  var sql = 'select * from user where userid = "' + user.id
      + '" and userpw= "' + user.pw + '";';
  console.log(sql);
  conn.query(sql, function(err, results){
    if(err) {
      console.log("error");
      console.log(err);
    }
    else{
      req.session.num_id = results[0].id;
      req.session.userid = results[0].userid;
      req.session.username = results[0].name;
      req.session.superuser = results[0].superuser;
      var sesuser = {
          id: req.session.num_id,
          userid: req.session.userid,
          name: req.session.username,
          superuser: req.session.superuser
      }
      req.session.save(function(){
          res.send(JSON.stringify(sesuser));
      });
    }
  });
});
module.exports = router;
