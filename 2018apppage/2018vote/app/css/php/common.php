<?php
ini_set('date.timezone','Asia/Shanghai');
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);

require_once 'config.php';
require_once 'log.php';
require_once 'api.php';

//======================================
// 函数: is_login()
// 功能: 用户登录判断
// 参数: 无
// 返回: true:   用户已登录
// 返回: false:  用户未登陆
// 说明:
//======================================
function is_login()
{
  session_start();
  // 用户未登录
  if (!isset($_SESSION['uid']))
    return false;

  return true;
}

//======================================
// 函数: chk_empty_args($type, $args)
// 功能: GET/POST必须参数是否为空检查
// 参数: $type          GET或POST
// 参数: $args          需检查的参数数组
// 返回: 无
// 说明: 若参数有一个为空则直接异常退出
//======================================
function chk_empty_args($type, $args)
{
  if (empty($type))
    return false;

  if ($type != 'GET' AND $type != 'POST')
    return false;

  foreach ($args as $arg) {
    $arg_str = '';

    if ($type == 'GET' && isset($_GET[$arg]))
      $arg_str = trim($_GET[$arg]);

    if ($type == 'POST' && isset($_POST[$arg]))
      $arg_str = trim($_POST[$arg]);

    if (empty($arg_str)) {
      return false;
    }
  }
  return true;

}

//======================================
// 函数: get_paging_arg($type)
// 功能: get_paging_arg
// 参数: $type          GET或POST
// 返回: array($limit, $offset)
// 说明: 分页相关参数(limit, offset)处理
//======================================
function get_paging_arg($type)
{
  $limit = Config::REC_LIMIT;
  $offset = 0;
  if ($type == 'GET' && isset($_GET['limit']))
    $limit = intval($_GET['limit']);
  if ($type == 'POST' && isset($_POST['limit']))
    $limit = intval($_POST['limit']);
  if ($type == 'GET' && isset($_GET['offset']))
    $offset = intval($_GET['offset']);
  if ($type == 'POST' && isset($_POST['offset']))
    $offset = intval($_POST['offset']);

  $limit = min($limit,Config::REC_LIMIT_MAX);

  return array($limit, $offset);
}

//======================================
// 函数: get_arg_str($type, $arg, $max_len)
// 功能: 获取GET/POST的参数，添加反斜杠处理
// 参数: $type          GET或POST
// 参数: $arg           参数
// 参数: $max_len       最大长度（默认50）
// 返回: 处理后的参数
// 说明:
//======================================
function get_arg_str($type, $arg, $max_len = 50)
{
  $arg_str = '';
  if ($type == 'GET')
    $arg_str = substr(trim($_GET[$arg]), 0, $max_len);

  if ($type == 'POST')
    $arg_str = substr(trim($_POST[$arg]), 0, $max_len);

  // PHP已开启自转义
  if (get_magic_quotes_gpc())
    return $arg_str;

  return addslashes($arg_str);
}


//======================================
// 函数: append_api_post($apidata, $type = 0)
// 功能: 向API提交的参数中添加固定参数
// 参数: $apidata       向API提交的参数
// 参数: $type          添加类型（默认1）
// 返回: 处理后的参数
// 说明: $type = 0 只添加用户IP
//       $type = 1 同时添加用户ID和验证Token
//======================================
function append_api_post($apidata = array(), $type = 1)
{
  if ($type) {
    $apidata['uid'] = $_SESSION['uid'];
    $apidata['token'] = $_SESSION['token'];
  }
  $apidata['ip'] = get_ip();

  return $apidata;
}

//======================================
// 函数: exit_error($errcode, $errmsg)
// 功能: 处理失败，异常退出
// 参数: $errcode       错误代码
// 参数: $errmsg        错误信息
// 返回: 无
// 说明: 退出，并返回json数据
//======================================
function exit_error($errcode, $errmsg)
{
  $rtn_ary = array();
  $rtn_ary['errcode'] = $errcode;
  $rtn_ary['errmsg'] = $errmsg;
  $rtn_str = json_encode($rtn_ary);
  php_end($rtn_str, Config::WARN_LEVEL);

}

//======================================
// 函数: exit_api_error($apidata)
// 功能: API返回失败代码后异常退出
// 参数: $apidata       API返回的数据
// 返回: 无
// 说明: 退出，并返回API返回的json数据
//======================================
function exit_api_error($apidata)
{
  $rtn_str = json_encode($apidata);
  if (empty($apidata)) {
    $rtn_str = json_encode(array('errcode'=>-1,'errmsg'=>'系统异常，稍后再试'));
  }
  php_end($rtn_str, Config::WARN_LEVEL);

}

//======================================
// 函数: get_ip()
// 功能: 取得用户访问IP
// 参数: 无
// 返回: XXX.XXX.XXX.XXX
// 返回:
//======================================
function get_ip()
{
  $ip=false;
  if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
    $ip = $_SERVER["HTTP_CLIENT_IP"];
  }
  if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
    if($ip) {
      array_unshift($ips, $ip);
      $ip = FALSE;
    }
    for($i = 0; $i < count($ips); $i++) {
      if (!eregi ("^(10|172\.16|192\.168)\.", $ips[$i])) {
        $ip = $ips[$i];
        break;
      }
    }
  }
  return($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

//======================================
// 函数: get_log_msg_str($rtn_data)
// 功能: 将日志里面的数组或JSON数据转成可识别的字符串形式
// 功能: 如果是JSON数据先转成数组形式
// 功能: 如果是数组则直接转成字符串形式
// 功能: 否则直接返回
// 参数: $rtn_data      需转换的数据
// 返回: 数组和JSON转成{"key1":"value1","key2":"value2"} 形式的字符串
//======================================
function get_log_msg_str($rtn_data)
{
  $rtn_arry = $rtn_data;
  // 非数组则尝试转成数组格式
  if (!is_array($rtn_arry)) {
    $rtn_arry = json_decode($rtn_data, true);
    // 转换结果为空数组则直接返回原有结果
    if (empty($rtn_arry))
      return $rtn_data;
  }

  $buff = "";
  foreach ($rtn_arry as $k => $v) {
    if (!is_array($v)) {
      $buff .= '"' . $k . '":"' . $v . '",';
    } else {
      $buff .= '"' . $k . '":' . get_log_msg_str($v) . ',';
    }
  }

  $buff = trim($buff, ",");
  return '{' . $buff . '}';
}

//======================================
// 函数: php_begin()
// 功能: 程序运行开始处理
// 参数: $log_level   日志等级(1跟踪，2 正常，4警告，8异常)
// 返回: 无
// 说明: PHP运行开始，日志等级默认1跟踪
//======================================
function php_begin($log_level = Config::DEBUG_LEVEL)
{
  // LOG日志是否执行判定
  if (Config::PHP_LOG_LEVEL > 0) {
    // 初始化PHP运行日志
    $logHandler= new LogFileHandler('logs/app_' . date('Y-m-d') . '.log');
    $log = Log::Init($logHandler, Config::PHP_LOG_LEVEL);
    // 记录信息，调用程序，用户IP，调用参数
    $msg = $_SERVER['PHP_SELF'] . " IP:" . get_ip() . " Get:" . get_log_msg_str($_GET) . " Post:" . get_log_msg_str($_POST);

    switch($log_level)
    {
      // 记录正常日志
      case Config::INFO_LEVEL:
        // 日志记录正常日志
        Log::INFO($msg);
        break;
      // 记录跟踪日志
      default:
        // 日志记录跟踪日志
        Log::DEBUG($msg);
        break;
    }
  }
  return;
}

//======================================
// 函数: php_end($rtn_data)
// 功能: 程序运行结束处理
// 参数: $rtn_data    返回信息(ApiRtnData类)
// 参数: $log_level   日志等级(1跟踪，2 正常，4警告，8异常)
// 返回: $rtn_data
// 说明: PHP运行结束处理，日志等级默认1跟踪
//======================================
function php_end($rtn_data, $log_level = Config::DEBUG_LEVEL)
{
  // LOG日志是否执行判定
  if (Config::PHP_LOG_LEVEL > 0) {
    // 初始化PHP运行日志
    $logHandler= new LogFileHandler('logs/app_' . date('Y-m-d') . '.log');
    $log = Log::Init($logHandler, Config::PHP_LOG_LEVEL);
    // 记录信息，调用程序，用户IP，返回数据
    $msg = $_SERVER['PHP_SELF'] . " IP:" . get_ip() . " Rtn:" . get_log_msg_str($rtn_data);

    switch($log_level)
    {
      // 记录异常日志
      case Config::ERROR_LEVEL:
        Log::ERROR($msg);
        break;
      // 记录警告日志
      case Config::WARN_LEVEL:
        Log::WARN($msg);
        break;
      // 记录正常日志
      case Config::INFO_LEVEL:
        Log::INFO($msg);
        break;
      // 记录跟踪日志
      default:
        Log::DEBUG($msg);
        break;
    }
  }

  exit($rtn_data);
}
?>