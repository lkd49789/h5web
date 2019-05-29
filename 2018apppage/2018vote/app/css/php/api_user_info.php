<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 查询用户信息 ==========================
POST参数
  无

返回
  uname     用户昵称
  avata     用户头像
  phone     联系电话  
  tp_rest   可使用投票权
  tp_total  累计投票权
              
说明
  调用用户资料取得API，取得用户资料并返回。
  中途失败，返回errcode 和 errmsg
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 构造API提交数据
$post_data = append_api_post();

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
