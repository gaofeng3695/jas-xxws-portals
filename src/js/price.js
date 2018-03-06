$("#close").click(function () {
  $('.suspensionFrame').css({ display: "none" })
})
$(".tel_btn").click(function () {
  var contactTel = $('.tel_Validate').val().trim();
  if(!tel(contactTel)) return;
  var uuid = creatuuid();
  var adviceMsg = '当前手机用户申请试用巡线卫士旗舰版';
  postAdvise(adviceMsg, contactTel, uuid)
});
function tel (contactTel) {
  var returnVal;
  var reg = /^(((17[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (contactTel == "") {
    $(".contactTelText").show().text('请输入手机号码');
    returnVal = false;
  } else if (contactTel.length != 11) {
    $(".contactTelText").show().text('请输入有效的手机号码');
    returnVal = false;
  } else if (!reg.test(contactTel)) {
    $(".contactTelText").show().text('请输入有效的手机号码');
    returnVa = false;
  } else {
    $(".contactTelText").hide();
    returnVal = true;
  }
  setTimeout(function () {
    $(".contactTelText").hide();
  }, 1000)
  return returnVal;
}

function postAdvise (textArea, contactWay, uuid) {
  $.ajax({ /*http://192.168.50.235:9901*/
    url: "/cloudlink-core-framework/feedback/addAdvice",
    type: "POST",
    contentType: "application/json",
    async: false,
    data: JSON.stringify({
      'description': textArea, //填写的建议
      'feedbackType': "pic", //建议类型
      'contact': contactWay, //联系方式
      'objectId': uuid //插入的主键id
    }),
    success: function (data) {
      if (data.success == 1) {
        $(".trial_main").hide();
        $(".trial_success").show();
      } else {
        alert("当前网络不稳定");
      }
    }
  });
}
function creatuuid () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {

    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}