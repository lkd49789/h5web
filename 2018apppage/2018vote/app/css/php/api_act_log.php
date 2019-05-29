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
    tpcd      投票卷CD
    tpseq     投票券序号
    tp_no     激活投票权数
    ctime     激活时间
    dev       激活设备（web，app，wx）

说明
  调用投票券激活记录取得API，只返回激活成功的记录。
  中途失败，返回errcode 和 errmsg
*/

php_begin();

if (!is_login())
  exit_error('101', "请先登录");

// 取得分页参数
list($limit, $offset) = get_paging_arg('POST');

// 构造API提交数据
$post_data = append_api_post(array('limit'=>$limit, 'offset'=>$offset));

// 调用投票券激活记录取得API，取得激活记录
$apidata = Api::act_log($post_data);

// API失败，则返回API的调用结果
if (Api::is_fail($apidata))
  exit_api_error($apidata);

$apidata['errcode'] = '0';
$apidata['errmsg'] = '';

$rtn_str = json_encode($apidata);
// 输出内容
php_end($rtn_str);
?>
