/**
 * Created by server on 4/28/16.
 */
var btnClicked;
var flag_1 = false;
var flag_2 = false;
var flag_3 = false;
var flag_extr = false;
function check_Password(){
    var password = document.getElementsByClassName('pwd');
    if(password[0].value!=password[1].value && password[0].value!==''){
        flag_1 = false;
        $('#pwdWrongInfo').show();
        $('#pwdRightInfo').hide();
    }
    if(password[0].value==password[1].value && password[0].value!==''){
        flag_1 = true;
        $('#pwdRightInfo').show();
        $('#pwdWrongInfo').hide();
    }
}
function delClass(){
    var id = "li";
    for(var i=1;i<5;i++){
        document.getElementById(id+i).className = "";
        id = "li";
    }
}

function check_Pic(){
    var head_pic = document.getElementById('human_id_card');
    if(head_pic.value===""||head_pic.files[0].size>(2*1024*1024)){
        flag_2 = false;
        $('#picWrongInfo').show();
    }
    else{
        flag_2 = true;
        $('#picWrongInfo').hide();
    }
}
function checkRegisted(phone){
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var text = xmlhttp.responseText;
            if( text == '1'&& phone!==''){
                flag_3 = false;
                flag_extr = true;
                $('#i1').show();
                $('#i2').hide();
            }
            if(text == '2'&& phone!==''){

                flag_3 = true;
                flag_extr = true;
                $('#i2').show();
                $('#i1').hide();
            }
        }
    }
    xmlhttp.open("POST","http://172.19.51.150:3000/check_1?phone="+phone,true);
    xmlhttp.send();
}
function navOnClick(target){
    var id = "li"+target;
    var code = parseInt(target);
    var showBtn = document.getElementById("setDataTarget");
    if(code == 1){
        $("#ModalLabel").text("患者注册界面");
        $("#show").attr("display","none");
        $("#line").hide();
        $(".doctorPic").hide();
        showBtn.style.display = "inline";
    }
    else if(code == 2){
        $("#ModalLabel").text("注册界面");
        $("show").attr("display","inline");
        $("hr").show();
        $(".doctorPic").show();
        showBtn.style.display = "inline";
    }
    if(code == 3||code == 4){
        showBtn.style.display = "none"
    }
    delClass();
    document.getElementById(id).className = "active";
}
function check(){
    if(!flag_extr){
        checkRegisted($('#phone_number').value);
    }

    check_Pic();
    var result = flag_1&&flag_2&&flag_3;
    if(result){
        return true;
    }
    else{
        return false;
    }

}
function init(){
    $("#dap-c").height($("#dap").height());
    $(".image").val("");
    $('#i2').hide();
    $('#i1').hide();
    $('#pwdWrongInfo').hide();
    $('#pwdRightInfo').hide();
    $('#picWrongInfo').hide();
}
