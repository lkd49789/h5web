<?php
include('include/common.php');
include('include/qqFileUploader.php');
//require 'www.snh48.com_v5/event/s115/wx/include/qqFileUploader.php';

$allowedExtensions = array('jpg', 'png', 'bmp','gif','jpeg');
// max file size in bytes
$sizeLimit = 1 * 1024 * 1024;

$uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
$result = $uploader->handleUpload('uploads/temp/',true); 

if(isset($result['success']))
{   
	 // $local_directory=dir.$result['filename']; 
     //$content=send_file($local_directory);  
     //if(!empty($content)){
		 // $result=array('success'=>true,'filename'=>$content[0]);  
	// }else{
	//	$result=$result;
	 //}	 
    
}

// to pass data through iframe you will need to encode all html tags
echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);


 