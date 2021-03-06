
var timeCode=60;
var companyName=null; //公司名称
var companyAddress=null; //公司地址
var contactName=null; //联系人姓名
var contactTel=null; //电话
var verification=null; //验证码
var contactEmail=null; //邮箱
var time=null; //预约时间
var falg=true;
/*显示表单*/
$(function(){
    $(".reservation_main_btn span").click(function(){
        $("html").css({overflow:"hidden",height: '100%'});
        $("body").css("padding","0 17px 0 0");
        $(".form_bg").show();
    });

    /*获取验证码*/
    $("body").on("click",".get_verification",function(){
        /*http://192.168.50.235:9901*/
        if(tel() == true){
            // debugger;
            getVerification(this);
            //调用获取验证码接口 并传手机号给后台
            var sendMode = {sendMode:1,useMode:3,sendNum:contactTel};
            $.get("/cloudlink-core-framework/login/getVerifyCode",sendMode,function(data){
                //console.log(data.success) 
            });
        }
    });
    /*提交表单*/
    $(".submit_btn").click(function(){
        submit();
    });

    /*关闭表单*/
    $(".cancel_btn").click(function(){
        closed();
    });
});

/*关闭表单*/
function closed(){
    $(".form_list_fr p").hide();
    $(".form_list input").val("");
    $(".form_list select").val("");
    $(".form_bg").hide();
    $("html").css({overflow:"auto",height: "auto"});
    $("body").css("padding","0");
}


/*获取验证码*/
function getVerification(e){
    if(timeCode==0){
        $(e).text("重新发送验证码");
        $(e).attr("class","get_verification");
        timeCode=60;
    }else{
        $(e).text("重新发送"+timeCode+"秒");
        $(e).attr("class","get_verification_no");
        timeCode--;
        setTimeout(function() {
            getVerification(e);
        },1000);
    }
}

/*验证验证码*/
function identifying(){
    /*http://192.168.50.235:9901*/
    $(".form_list_fr p").hide();
    verification=$("input[name='verification']").val().trim();
    if(verification == ''){
        $(".verificationText").show().text("*请输入验证码");
        return false;
    }else{
        //调用验证验证码接口 并传手机号 验证码给后台
        var res;
        $.ajax({  
            type : "get",  
            url : "/cloudlink-core-framework/login/checkVerifyCode",  
            data : {sendMode:1,sendNum:contactTel,verifyCode:verification},  
            async : false,  
            success : function(data){
                if(data.success == -1){
                    $(".verificationText").show().text("*验证码错误");
                    res =  false;
                }else{
                    $(".verificationText").hide();
                    res =  true;
                } 
            }  
        });
        return res;
    }
}
/*验证手机号*/
function tel(){
    $(".form_list_fr p").hide();
    contactTel=$("input[name='contactTel']").val().trim();
    var reg = /^(((17[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(contactTel==""){
        $(".contactTelText").show().text('*请输入手机号码');
        return false;
    }else if(contactTel.length !=11){
        $(".contactTelText").show().text('*请输入有效的手机号码');
        return false;
    }else if(!reg.test(contactTel)){
        $(".contactTelText").show().text('*请输入有效的手机号码');
        return false;
    }else{
        $(".contactTelText").hide();
        return true;
    }
}

/*验证邮箱*/
function email(){
    $(".form_list_fr p").hide();
    contactEmail=$("input[name='contactEmail']").val().trim();
    var reg =/^([A-z0-9])+@([A-z0-9])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var reg =/^[A-z0-9]+@[A-z0-9]+\.[A-z]+$/;
            
    if(contactEmail == ''){
        return true;
    }else if (!reg.test(contactEmail)) {
        $(".contactEmailText").show().text('*您输入的邮箱地址有误');
        return false;
    }else{
        $(".contactEmailText").hide();
        return true;
    }
}

/*提交预约表单*/
function submit(){
    if(falg==true){
        falg=false;
        companyName=$("input[name='companyName']").val().trim();
        companyAddress=$("input[name='companyAddress']").val().trim();
        contactName=$("input[name='contactName']").val().trim();
        time=$("input[name='time']").val().trim();

        if(companyName == ''){
            $(".form_list_fr p").hide();
            $(".companyNameText").show();
            chooseBtn();
            return false;
        }else if(companyAddress == ''){
            $(".form_list_fr p").hide();
            $(".companyAddressText").show();
            chooseBtn();
            return false;
        }else if(contactName == ''){
            $(".form_list_fr p").hide();
            $(".contactNameText").show();
            chooseBtn();
            return false;
        }else if(tel() == false){
            chooseBtn();
            return false;
        }else if(email() == false){
            chooseBtn();
            return false;
        }else if(time == ''){
            $(".form_list_fr p").hide();
            $(".timeText").show();
            chooseBtn();
        }else if(identifying() == false){
            chooseBtn();
            return false;
        }else{
            $(".form_list_fr p").hide();
        /*http://192.168.50.235:9901*/
            //调用保存数据的接口 并传表单内（除了验证码外）的所有信息给后台
            $.ajax({
                url:"/cloudlink-inspection-operation/bespeak/save",
                type:"POST",
                contentType:"application/json",
                dataType:"json",
                data:JSON.stringify({
                    "companyName":companyName,
                    "companyAddress":companyAddress,
                    "contactName":contactName,
                    "phoneNumber":contactTel,
                    "email":contactEmail,
                    "bespeakTime":time,
                }),
                success:function(data){
                    var status = data.success;
                    if(status==1){
                        $(".form_main").hide();
                        $(".form_success").show();
                    }else{
                        alert("当前网络不稳定")
                    }
                }
            })
        } 
    }
}

/*重新点击*/
function chooseBtn(){
    falg=true;
}

String.prototype.trim = function () {
    return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}