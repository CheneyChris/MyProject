<?php
include("init.php");

$action = isset($_GET['action']) ? $_GET['action'] : "";
$art_id = isset($_GET['art_id']) ? $_GET['art_id'] : 0;

$page = isset($_POST['current']) ? $_POST['current'] : 1;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 6;
$fcate_id = isset($_GET['fcate_id']) ? $_GET['fcate_id'] : 0;
$food_name = isset($_GET['food_name']) ? $_GET['food_name'] : "";

$food_id = isset($_GET['food_id']) ? $_GET['food_id'] : 0;
$news_id = isset($_GET['news_id']) ? $_GET['news_id'] : 0;

$region_id = isset($_GET['region_id']) ? $_GET['region_id'] : 0;
$shop_name = isset($_GET['shop_name']) ? $_GET['shop_name'] : "";
$shop_id = isset($_GET['shop_id']) ? $_GET['shop_id'] : 0;

if ($action == "banner")  //广告图
{
    $sql = "SELECT * FROM {$pre_}article WHERE artcate_id = 1 ORDER BY art_id DESC LIMIT 10";
    $banner_list = getAll($sql);
    echo json_encode($banner_list);
    exit;
} else if ($action == "news_food") {
    $sql = "SELECT * FROM {$pre_}food ORDER BY food_id DESC LIMIT 24";
    $news_food = getAll($sql);
    $arr = array_chunk($news_food, 8);
    echo json_encode($arr);
    exit;
} else if ($action == "about_us") {
    $sql = "SELECT * FROM {$pre_}article WHERE artcate_id = 2 AND art_title LIKE '%公司简介%' LIMIT 1";
    $about = getOne($sql);
    echo json_encode($about);
    exit();
} else if ($action == "home_news") {  //新闻资讯
    $sql = "SELECT * FROM {$pre_}article WHERE artcate_id = 3 ORDER BY art_id DESC LIMIT 8";
    $news_food = getAll($sql);
    echo json_encode($news_food);
    exit;
} else if ($action == "home_news_one") {  //新闻资讯
    $sql = "SELECT * FROM {$pre_}article WHERE artcate_id = 3 ORDER BY art_id DESC LIMIT 1";
    $news_food_one = getOne($sql);
    echo json_encode($news_food_one);
    exit;
} else if ($action == "link") {

    // 友情链接的图片
    $sql = "SELECT * FROM {$pre_}link WHERE link_order = 1";
    $link_img = getAll($sql);

    // 友情链接的文字
    $sql = "SELECT * FROM {$pre_}link WHERE link_order = 2";
    $link_text = getAll($sql);
    
    // 把他们放到一个数组里
    $arr = [$link_img, $link_text];
    echo json_encode($arr);
    exit;
} else if ($action == "article_list" && $art_id) {
    $sql = "SELECT * FROM {$pre_}article WHERE art_id = $art_id";
    $article_list = getOne($sql);
    echo json_encode($article_list);
    exit;
} else if ($action == "food_cate") {
    // 食品分类 类型
    $sql = "SELECT * FROM {$pre_}catefood LIMIT 6";
    $cate_list = getAll($sql);
    echo json_encode($cate_list);
    exit;
} else if ($action == "food_count") {
    if ($fcate_id) {
        $where = "fcate_id = $fcate_id";
    } else if (!empty($food_name)) {
        $where = "food_name LIKE '%$food_name%'";
    } else {
        $where = 1;
    }
    $sql = "SELECT COUNT(*) AS c FROM {$pre_}food WHERE $where";
    $count = getOne($sql);
    echo json_encode($count);
    exit;
} else if ($action == "food_list") {

    // 数据筛选
    if ($fcate_id) {
        $where = "fcate_id = $fcate_id";    //通过分类id 筛选数据 多条
    } else if (!empty($food_name)) {
        $where = "food_name LINK '%$food_name%'"; //用户输入框搜索 可能显示多条
    } else {
        $where = 1;     //没有搜索的情况下, 显示所有数据
    }

    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}food WHERE $where LIMIT $start,$limit";
    $food_list = getAll($sql);
    echo json_encode($food_list);
    exit;
} else if ($action == "food_info") {
    $sql = "SELECT * FROM {$pre_}food WHERE food_id = $food_id";
    $food_info = getOne($sql);
    echo json_encode($food_info);
} else if ($action == "news") {

    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}article WHERE artcate_id = 3 LIMIT $start,$limit";

    $news_list = getAll($sql);
    echo json_encode($news_list);

} else if ($action == "news_count") {

    $sql = "SELECT COUNT(*) AS c FROM {$pre_}article WHERE artcate_id = 3";
    $news_count = getOne($sql);
    echo json_encode($news_count);

} else if ($action == "news_info") {
    $sql = "SELECT * FROM {$pre_}article WHERE art_id = $news_id";
    $news_info = getOne($sql);
    echo json_encode($news_info);
} else if ($action == "region_list") {
    $sql = "SELECT * FROM {$pre_}region";
    $region_list = getAll($sql);
    echo json_encode($region_list);
} else if ($action == "shop_count") {
    if ($region_id) {
        $where = "region_id = $region_id";
    } else {
        $where = 1;
    }
    $sql = "SELECT COUNT(*) AS c FROM {$pre_}shop WHERE $where";
    $count = getOne($sql);
    echo json_encode($count);
    exit;
} else if ($action == "shop_list") {

    if ($region_id) {
        $where = "region_id = $region_id";
    } else if (!empty($shop_name)) {
        $where = "shop_name LIKE '%$shop_name%'";
    } else {
        $where = 1;
    }
    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}shop WHERE $where LIMIT $start,$limit";
    $shop_list = getAll($sql);
    echo json_encode($shop_list);
    exit;
} else if ($action == "shop_detail") {
    $sql = "SELECT * FROM {$pre_}shop AS shop LEFT JOIN {$pre_}region AS region ON shop.region_id = region.region_id WHERE shop.shop_id = $shop_id";
    $shop_detail = getOne($sql);
    echo json_encode($shop_detail);
    exit;
} else if ($action == "company_list") {
    $sql = "SELECT * FROM {$pre_}company";
    $company_list = getAll($sql);
    echo json_encode($company_list);
}

?>