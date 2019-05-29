<?php

require 'functions.php';

header("Content-type: text/html; charset=utf-8");
date_default_timezone_set("Asia/Shanghai");
define('USER_IP',$_SERVER['REMOTE_ADDR']);
//接口配置
define('interface','http://wx.snh48.com/wx');
//本地测试
//define('interface','http://192.168.4.115:8080/wx');
define('dir','/usr/db/htdocs/h5.snh48.com/snh48/discussion/');

session_start();
