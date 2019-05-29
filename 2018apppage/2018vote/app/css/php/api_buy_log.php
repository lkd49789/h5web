<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 投票券激活记录 ==========================
POST参数
  limit     （记录条数，可选）默认10 最大100
  offset    （记录偏移量，可选）默认0 与limit参数一起分页使用。如设置 offset=20&limit=10 取第21-30条记录

返回
  total     总记录件数
  rows      记录数组
    pay_type  支付渠道 （1 支付宝 2 微信支付）
    order_id  订单ID
    pd_type   产品类型  （1 5元单曲 2 450元EP）
    amount    购买数量
    total_amount  购买金额
    tp_no     获得投票权数
    ctime     购买时间
    dev       购买设备（web，app）

说明
  只返回购买成功的记录
  获得投票权 5元单曲=0.1票，450元EP=10票
  如无数据返回空数组
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 取得分页参数
list($limit, $offset) = get_paging_arg('POST');

// 构造API提交数据
$post_data = append_api_post(array('limit'=>$limit, 'offset'=>$offset));

// 调用电子券购买记录取得，取得购买记录
$apidata = Api::buy_log($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

$apidata['errcode'] = '0';
$apidata['errmsg'] = '';

$rtn_str = json_encode($apidata);
// 输出内容
php_end($rtn_str);
?>
