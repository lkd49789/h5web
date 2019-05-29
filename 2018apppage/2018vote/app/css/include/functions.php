<?php
//以post方式提交数据到对应的接口url
function postCurl($post_data, $url, $second = 300)

	{

		$ch = curl_init();



		// 设置超时

		curl_setopt($ch, CURLOPT_TIMEOUT, $second);

    // 设置URL地址

		curl_setopt($ch, CURLOPT_URL, $url);

		// 获取的信息以文件流的形式返回

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);



   
		//post提交方式

		curl_setopt($ch, CURLOPT_POST, TRUE);

		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);


    //运行curl

		$data = curl_exec($ch);


    //返回结果

		if ($data) {

			curl_close($ch);

			return $data;

		} else {

			$error = curl_errno($ch);

			curl_close($ch);

			throw new Exception("API调用出错，URL:$url 错误码:$error");

		}

	}
	
    	////PHP stdClass Object转array  
     function object_array($array) { 
	 
			if(is_object($array)) {  
			
				$array = (array)$array; 
				
			 } if(is_array($array)) {  
			 
				 foreach($array as $key=>$value) {  
				 
					 $array[$key] = object_array($value);  
					 
					 }  
			 }  
			 return $array;  
     }
	 
	function send_file($local_directory){
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
    curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_URL, 'http://wx.snh48.com/wx/h5/forum/upload');
	//most importent curl assues @filed as file field
    $post_array = array(
        "medias"=>"@".$local_directory,
        "type"=>"image"
    );
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_array);
    $response = curl_exec($ch);
	$code=json_decode($response)->code;
	if($code==0)
		$content=json_decode($response)->content;
	  else
		$content=array();
	    return $content;
	 } 
?>