var express = require('express');
var fs = require('fs');
var url = require('url');
var http = require('http');
var formidable = require("formidable");
var dbOperate = require('./dbOperate')
var router = express.Router();
var rowInfo = {};


router.get('/', function(req, res, next) {
  res.render('index',{content:""});
});
router.post('/check_1',function(req,res,next){
  var operate = new dbOperate();
  var phone = url.parse(req.url,true).query;
  operate.check_is_user_exist(phone.phone,res);
  operate = null;
});
router.post('/registe',function(req,res,next){
  var operate = new dbOperate();
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var path = fields.name+'-'+fields.phone+'-'+new Date();
    path = path.replace(' ','-');
    rowInfo.name = fields.name;
    rowInfo.pwd = fields.pwd;


    rowInfo.phone = fields.phone;
    rowInfo.headPicPath = path;
    operate.save_patient_registe_info(rowInfo);
    fs.renameSync(files.idCard.path, './public/images/userRegiste/' + path+'.jpg');
    operate = null;
  });
  res.redirect('/');

});
module.exports = router;
