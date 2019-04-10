<?
$openid=$_REQUEST['openid']; 
$wx_token='ceca73efe351';
$token='aa168aa726';
$url="http://mb.mtq.tvm.cn/rest/PlatformUserinfo?token=$token&openid=$openid&wx_token=$wx_token";
$header = array('Accept: text/json');    
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch,  CURLOPT_HTTPHEADER, $header);
$output = curl_exec($ch);

curl_close($ch);
//print_r($output);
die($output);

?>