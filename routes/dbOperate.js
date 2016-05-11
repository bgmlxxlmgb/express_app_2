/**
 * Created by server on 5/9/16.
 */
var mongoose = require('mongoose');
var configuration = require('./configuration');
mongoose.connect(configuration.db.mongodb);
var Schema_User_Registe_Prtient = new mongoose.Schema({
    name:{type:String,default:''},
    phone:{type:String,default:''},


    pwd:{type:String,default:''},
    headPicPath:{type:String,default:''},
});
var patientRegisteInfo = mongoose.model('userLogin',Schema_User_Registe_Prtient);

module.exports = function(){
    this.save_patient_registe_info = function(document){
        var insert = new patientRegisteInfo(document);
        //mongoose.connect(configuration.db.mongodb);
        insert.save(function(err,docs){
            if(err){
                //this.save_patient_registe_info(document);
                console.log('err');
                console.log(err);
            }
        });
        //mongoose.disconnect();
    };
    this.check_is_user_exist = function(phone,res){
        res.setHeader("Content-Type","text/plain");
        res.setHeader("Access-Control-Allow-Origin","http://172.19.51.150:3000");
        //mongoose.connect(configuration.db.mongodb);
        patientRegisteInfo.find({phone:phone},function(err,docs){
            if(!err){
                if(docs.length>0){
                    console.log('1'+docs);
                    res.write('1');
                }
                else{
                    console.log('2');
                    res.write('2');
                }
            }
            else{
                console.log('3');
                res.write('3');
            }
            res.end();
        })
        //mongoose.disconnect();
    };
    this.doModify = function(){};
    this.doDelete = function(){};

}