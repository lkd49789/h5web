<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 故障申报记录取得 ==========================
POST参数
  limit     （记录条数，可选）默认10 最大100
  offset    （记录偏移量，可选）默认0 与limit参数一起分页使用。如设置 offset=20&limit=10 取第21-30条记录

返回
  total     总记录件数
  rows      记录数组
              
说明
  调用故障申报取得API，返回故障申报的记录。
  中途失败，返回errcode 和 errmsg
*/

php_begin();
if (!is_login())
    exit_error('101', "请先登录");

// 取得分页参数
list($limit, $offset) = get_paging_arg('POST');
if (!chk_empty_args('POST', array('appid'))) {
    exit_error('120', "参数错误:没有appid");
}
$appid = trim($_POST['appid']);

// 构造API提交数据
$post_data = append_api_post(array('limit' => $limit, 'offset' => $offset, 'appid' => $appid), 1);
// 调用投票记录取得API，取得用户资料

$apidata = Api::feedback_log($post_data);

$response = array();
if ($apidata['status'] != 0) {
    $response['errcode'] = $apidata['status'] . '';
    $response['errmsg'] = $apidata['message'];
} else {
    $response['errcode'] = '0';
    $response['errmsg'] = '';
    $response['rows'] = $apidata['content']['rows'];
    $response['total'] = $apidata['content']['total'];
}
$rtn_str = json_encode($response);
// 输出内容
php_end($rtn_str);
?>
