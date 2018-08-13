<?php
$conn = @mysqli_connect("localhost","root","root") or die("连接数据库失败");

// 设置默认时区
date_default_timezone_set("PRC");

//选择数据库
mysqli_select_db($conn,"food");

//设置编码
mysqli_query($conn,"SET NAMES UTF8");

//把表前缀添加到变量里面
$pre_ = "pre_";

//统一在初始化配置文件中引入辅助函数文件
include_once("helpers.php");
?>