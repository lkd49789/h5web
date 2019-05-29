<?php
// 配置信息类
class Config
{
  // 跟踪日志等级
  const DEBUG_LEVEL = 1;
  // 信息日志等级
  const INFO_LEVEL = 2;
  // 警告日志等级
  const WARN_LEVEL = 4;
  // 异常日志等级
  const ERROR_LEVEL = 8;
  // PHP日志等级(0关闭，15全部, 14关闭跟踪日志)
  const PHP_LOG_LEVEL = 15;

  // 一次读取记录条数
  const REC_LIMIT = 10;
  // 一次最多读取记录条数
  const REC_LIMIT_MAX = 100;
  
  // API调用超时
  const API_TIMEOUT = 10;
  
  // 总选是否开放
  const VOTE_OPEN = true;
}
?>