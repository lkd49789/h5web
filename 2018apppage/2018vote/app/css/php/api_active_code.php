<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 投票券激活处理 ==========================
POST参数
  tpcd      投票券激活码

返回
  tpseq     激活投票券序号
  tp_no     激活投票权数
              
说明
  调用投票券激活API，取得投票券情报并返回。
  中途失败，返回errcode 和 errmsg
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 参数检查
$args = array('tpcd', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$tpcd = get_arg_str('POST', 'tpcd');
$dev_cd = get_arg_str('POST', 'dev_cd');

// 构造API提交数据
$post_data = append_api_post(array('tpcd'=>$tpcd, 'dev_cd'=>$dev_cd));

// 调用投票券激活API，取得投票券情报
$apidata = Api::code_act($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

// 记录API取得的投票券情报
$tpseq = $apidata['tpseq'];
$tp_no = $apidata['tp_no'];

$rtn_ary = array();
$rtn_ary['errcode'] = '0';
$rtn_ary['errmsg'] = '';
$rtn_ary['tpseq'] = $tpseq;
$rtn_ary['tp_no'] = $tp_no;

$rtn_str = json_encode($rtn_ary);
// 输出内容
php_end($rtn_str);
?>
