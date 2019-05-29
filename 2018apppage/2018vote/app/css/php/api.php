<?php
// API调用类
class Api
{
  // URL前缀添加
  private static function prefix_url($url) {
    return 'http://h5.snh48.com/2016vote/api/' . $url;
  }

  // Java故障申报服务器地址
  private static function java_feedback_url($url){
    return 'http://54.222.199.192/' . $url;
  }

  // APP账号登录
  public static function app_login($post_data)
  {
    $url = self::prefix_url('vote/app_login.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // APP用户绑定丝瓜账号
  public static function app_web_bind($post_data)
  {
    $url = self::prefix_url('vote/app_web_bind.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // APP用户绑定设备号短信发送
  public static function app_bind_sms($post_data)
  {
    $url = self::prefix_url('vote/app_bind_sms.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // APP用户绑定设备号
  public static function app_dev_bind($post_data)
  {
    $url = self::prefix_url('vote/app_dev_bind.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 用户资料取得
  public static function user_info($post_data)
  {
    $url = self::prefix_url('vote_srh/user_info.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 投票券激活
  public static function code_act($post_data)
  {
    $url = self::prefix_url('vote/code_act.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 电子券订单提交
  public static function buy_order($post_data)
  {
    $url = self::prefix_url('vote/app_buy_order.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }
  
  // 登录用户投票
  public static function user_vote($post_data)
  {
    $url = self::prefix_url('vote/user_vote.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 投票券激活记录取得
  public static function act_log($post_data)
  {
    $url = self::prefix_url('vote_srh/act_log.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 投票记录取得
  public static function vote_log($post_data)
  {
    $url = self::prefix_url('vote_srh/vote_log.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 故障申报记录取得
  public static function feedback_log($post_data)
  {
    $url = self::java_feedback_url('feedback/api/feedback/list');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 故障申报
  public static function feedback($post_data)
  {
    $url = self::java_feedback_url('feedback/api/feedback/post');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 合计投票记录取得
  public static function vote_sum_log($post_data)
  {
    $url = self::prefix_url('vote_srh/vote_sum_log.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }

  // 电子券购买记录取得
  public static function buy_log($post_data)
  {
    $url = self::prefix_url('vote_srh/buy_log.php');
    try {
      $response = self::postCurl($post_data, $url, Config::API_TIMEOUT);
      return json_decode($response, true);
    } catch (Exception $e){
      return self::err_response($e->getMessage());
    }
  }
  

  /**
   * 以get方式访问对应的接口url
   *
   * @param string $url     url
   * @param int $second     url执行超时时间，默认30s
   * @throws Exception
   */
  private static function getCurl($url, $second = 30)
  {
    $ch = curl_init();

    // 设置超时
    curl_setopt($ch, CURLOPT_TIMEOUT, $second);

    // 设置URL地址
    curl_setopt($ch, CURLOPT_URL, $url);

    // 获取的信息以文件流的形式返回
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    //运行curl
    $data = curl_exec($ch);
    $error = curl_errno($ch);
    curl_close($ch);

    //curl正常返回结果
    if ($error == 0) {
      return $data;
    } else {
      throw new Exception("API调用出错，错误码:$error");
    }
  }

  /**
   * 以post方式提交json到对应的接口url
   *
   * @param string $post_data    需要post的json数据
   * @param string $url     url
   * @param int $second     url执行超时时间，默认30s
   * @throws Exception
   */
  private static function postCurl($post_data, $url, $second = 30)
  {
    $ch = curl_init();

    // 设置超时
    curl_setopt($ch, CURLOPT_TIMEOUT, $second);

    // 设置URL地址
    curl_setopt($ch, CURLOPT_URL, $url);

    // SSL验证
    // curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,TRUE);
    // SSL严格校验
    // curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,2);

    // 头文件的信息不输出
    // curl_setopt($ch, CURLOPT_HEADER, FALSE);

    // 获取的信息以文件流的形式返回
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    // 设置HTTP头
    // $headers = array("Content-Type: application/json;charset=UTF-8");
    // var_dump($headers);
    // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    //post提交方式
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    //运行curl
    $data = curl_exec($ch);
    $error = curl_errno($ch);
    curl_close($ch);

    //curl正常返回结果
    if ($error == 0) {
      return $data;
    } else {
      throw new Exception("API调用出错，错误码:$error");
    }
  }

  // 定制异常返回信息
  public static function err_response($msg)
  {
    $response = array();
    $response['errcode'] = '-1';
    $response['errmsg'] = $msg;
    return json_encode($response);
  }

  // 判断API是否返回处理失败信息
  public static function is_fail($apidata)
  {
    if (empty($apidata))
      return true;
    if (isset($apidata['errcode']) && $apidata['errcode'] != 0)
      return true;
    return false;
  }

}
?>