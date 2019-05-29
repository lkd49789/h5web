<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 电子券订单提交 ==========================
POST参数
  order_type  购买渠道 （1 支付宝 2 微信支付）
  pd_type     产品类型 （1 5元单曲 2 450元EP）
  amount      购买数量
  dev_cd      设备号

返回
  order_id      订单ID
  total_amount  购买金额(RMB 单位分)

说明
  只有登录用户才能购买
  连续5次订单未成交的30分钟内会被禁止再次提交订单
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 参数检查
$args = array('order_type', 'pd_type', 'amount', 'dev_cd');

if (!chk_empty_args('POST', $args))
  exit_error('120', "参数错误");

// 提交参数整理
$order_type = intval($_POST['order_type']);
$pd_type = intval($_POST['pd_type']);
$amount = intval($_POST['amount']);
$dev_cd = get_arg_str('POST', 'dev_cd');

// 购买渠道检查（1 支付宝 2 微信）
if ($order_type < 0 || $order_type > 2)
  exit_error('120', '购买渠道错误');

// 产品类型检查（1 5元单曲 2 450元EP）
if ($pd_type < 0 || $pd_type > 2)
  exit_error('120', '产品类型错误');

// 购买数量
if ($amount < 0)
  exit_error('120', '购买数量错误');

// 构造API提交数据
$post_data = append_api_post(array('order_type'=>$order_type, 'pd_type'=>$pd_type, 'amount'=>$amount, 'dev_cd'=>$dev_cd));

// 调用电子券订单提交API，取得结果
$apidata = Api::buy_order($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

// 记录API返回的订单号和总金额
$order_id = $apidata['order_id'];
$total_amount = $apidata['total_amount'];
$url = $apidata['url'];

$rtn_ary = array();
$rtn_ary['errcode'] = '0';
$rtn_ary['errmsg'] = '';
$rtn_ary['order_id'] = $order_id;
$rtn_ary['total_amount'] = $total_amount;
$rtn_ary['url'] = $url;

$rtn_str = json_encode($rtn_ary);
// 输出内容
php_end($rtn_str);
?>
