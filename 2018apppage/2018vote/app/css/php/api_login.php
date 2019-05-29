<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 会员登录 ==========================
POST参数
  appid     APPID
  apptoken  APPToken
  uname     用户昵称
  avata     用户头像地址
  dev_cd    设备号

返回
  uname     用户昵称
  avata     用户头像
  phone     联系电话
  tp_rest   可使用投票权（APP用户会累计绑定的丝瓜账号）
  tp_total  累计投票权（APP用户会累计绑定的丝瓜账号）

说明
  连续5次登陆失败（APPToken验证失败）30分钟内该APPID会被禁止再次登录
  首次登录会将设备号绑定在appid上
  该账号在非绑定设备号上登录需要通过手机号码进行重新绑定操作。

  1201  APPToken验证失败
  1202  非绑定设备号
*/

php_begin();

// 参数检查
$args = array('appid', 'apptoken', 'uname', 'avata', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$appid = intval($_POST['appid']);
// $apptoken = get_arg_str('POST', 'apptoken', 255);
$uname = get_arg_str('POST', 'uname');
$avata = get_arg_str('POST', 'avata', 255);
$dev_cd = get_arg_str('POST', 'dev_cd');

// 构造API提交数据
$post_data = append_api_post(array('appid'=>$appid, 'apptoken'=>$_POST['apptoken'], 'uname'=>$uname, 'avata'=>$avata, 'dev_cd'=>$dev_cd), 0);

// 调用APP账号登录API，获取uid和token
$apidata = Api::app_login($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

// 记录API取得的uid和token
$uid = $apidata['uid'];
$token = $apidata['token'];

// 构造API提交数据
$post_data = append_api_post(array('uid'=>$uid, 'token'=>$token), 0);

// 调用用户资料取得API，取得用户资料
$apidata = Api::user_info($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

// 记录API取得的用户资料
$uname = $apidata['uname'];
$avata = $apidata['avata'];
$phone = $apidata['phone'];
$tp_rest = $apidata['tp_rest'];
$tp_total = $apidata['tp_total'];

// 设置SESSION
session_start();
$_SESSION['uid'] = $uid;
$_SESSION['token'] = $token;

$rtn_ary = array();
$rtn_ary['errcode'] = '0';
$rtn_ary['errmsg'] = '';
$rtn_ary['uname'] = $uname;
$rtn_ary['avata'] = $avata;
$rtn_ary['phone'] = $phone;
$rtn_ary['tp_rest'] = $tp_rest;
$rtn_ary['tp_total'] = $tp_total;

$rtn_str = json_encode($rtn_ary);
// 输出内容
php_end($rtn_str);
?>
