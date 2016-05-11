/**
 * Created by server on 5/8/16.
 */
var sys = require('util');
var fs = require('fs');
exports.util = function(filename,key){
    var configJson = {};
    try{
        var str = fs.readFileSync(filename,'utf8');
        //console.log(str);
        configJson = JSON.parse(str);
    }catch(e){
        sys.debug("JSON PARSE fails")
    }
    return configJson[key];
}
