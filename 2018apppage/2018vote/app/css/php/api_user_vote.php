<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 登录用户投票 ==========================
POST参数
  sid       成员ID
  tp_no     投票数

返回
  errcode   0 请求成功
              
说明
  调用用户投票API，并返回结果。
  中途失败，返回errcode 和 errmsg
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 参数检查
$args = array('sid', 'tp_no', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$sid = intval($_POST['sid']);
$tp_no = round($_POST['tp_no'], 1);
$dev_cd = get_arg_str('POST', 'dev_cd');

// 投票数量检查
if ($tp_no < 0.1)
  exit_error('120', "投票数错误");

// 构造API提交数据
$post_data = append_api_post(array('sid'=>$sid, 'tp_no'=>$tp_no, 'dev_cd'=>$dev_cd));

// 调用登录用户投票API，取得结果
$apidata = Api::user_vote($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

// 记录API取得的投票结果
$rtn_ary = array();
$rtn_ary['errcode'] = '0';
$rtn_ary['errmsg'] = '';

$rtn_str = json_encode($rtn_ary);
// 输出内容
php_end($rtn_str);
?>
