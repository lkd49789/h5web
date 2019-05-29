<?php
require_once('common.php');

header("cache-control:no-cache,must-revalidate");
header("Content-Type:application/json;charset=utf-8");

/*
========================== 提交故障申报 ==========================
*/
php_begin();
if (!is_login())
    exit_error('101', "请先登录");

$params = array('orderFrom' => 2, 'subsys' => '口袋48');

$args = array('appid','uname', 'phone', 'type', 'devCd','devVer', 'submitInfo');

if (!chk_empty_args('POST', $args)) {
    exit_error('120', "参数错误");
}
if (chk_empty_args('POST', array('pic'))) {
    $params['pic'] = trim($_POST['pic']);
}
$params['appid'] = trim($_POST['appid']);
$params['uname'] = trim($_POST['uname']);
$params['phone'] = trim($_POST['phone']);
$params['type'] = trim($_POST['type']);
$params['dev_cd'] = trim($_POST['devCd']);
$params['devVer'] = trim($_POST['devVer']);
$params['submitInfo'] = trim($_POST['submitInfo']);

// 构造API提交数据
$post_data = append_api_post($params, 1);

// 调用投票记录取得API，取得用户资料
$apidata = Api::feedback($post_data);

$response = array();
if ($apidata['status'] != 0) {
    $response['errcode'] = $apidata['status'] . '';
    $response['errmsg'] = $apidata['message'];
} else {
    $response['errcode'] = '0';
    $response['errmsg'] = '';
}
$rtn_str = json_encode($response);
// 输出内容
php_end($rtn_str);
?>
