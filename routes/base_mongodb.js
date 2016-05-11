
var Util = require('./util');
var mongodb = require('mongodb');

var db;
var dbclient;
var i = 1;


module.exports = function(){
    _constructor();
    this.findOneById = function(tableName,idJson,callback){};
    //插入数据
    this.insert = function(tableName,rowInfo,callback){
        console.log('1');
        //rowInfo._id = mongodb.BSONPure.ObjectID();
        connection(function(obj){
            obj.collection(tableName,function(err,collection){
                console.log('22222'+obj);
                if(!err){
                    //collection.ensureIndex({"name":1},{"unique":true, "dropDups":true});
                    collection.insert(rowInfo,{safe:true},function(err,objects){
                        //if(err){console.log('7');callback(false);} else{console.log('8');callback(objects);}
                        //console.log(objects);
                        //console.log(err);
                        //db.close();
                        //dbclient.close();
                        //db.close();
                        console.log('11111'+objects);

                    });
                }
                else{
                    console.log('collection err');
                }
            });
        });
        dbclient.on("close", function (err,db) {//关闭数据库
            if(err) throw err;
            else {db = null;console.log("成功关闭数据库.");}
        });

    };

    this.modify = function(tablename,idJson,callback){};
    this.remove = function(tablename,idJson,callback){};
    this.find = function(tablename,whereJson,orderByJson,limitArr,fieldsArr,callback){};
    this.filterSelfRow = function(rowInfo){};
    function connection(callback){
        console.log('2');
        if(!db){
            console.log('3');
            var dbConfig = Util.util('./config.json','db');
            var host = dbConfig['host'];
            var port = dbConfig['port'];
            var dbName = dbConfig['db_name'];
            var server = new mongodb.Server(host,port,{auto_reconnect : true});
            var user = dbConfig['user'];
            var password = dbConfig['password'];
            dbclient = new mongodb.Db(dbName,server,{safe:true});
            dbclient.open(function(err,dbReturn){
               if(dbReturn){
                   console.log('4');
                   //console.log('111111'+dbReturn);
                   dbclient.authenticate(user,password,function(err,Object){
                       //console.log('1111'+Object);
                       //console.log(dbReturn);
                       db = dbReturn ;
                       //console.log(db);
                       callback(dbReturn);
                       console.log("success connect");

                   });
               }
                else{
                   console.log('5');
                   console.log("open err");
               }
            });
        }
        else{
            console.log('6');
            //console.log(db);
            callback(db);
        }
    }
    function _constructor(){};
}
