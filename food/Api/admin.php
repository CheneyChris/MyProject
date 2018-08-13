<?php
include("init.php");

$action = isset($_GET['action']) ? $_GET['action'] : "";
$page = isset($_POST['current']) ? $_POST['current'] : 1;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 10;
//食品id
$food_id = isset($_GET['food_id']) ? $_GET['food_id'] : 0;
// 文章id
$art_id = isset($_GET['art_id']) ? $_GET['art_id'] : 0;
$artcate_id = isset($_GET['artcate_id']) ? $_GET['artcate_id'] : 0;
$fcate_id = isset($_GET['fcate_id']) ? $_GET['fcate_id'] : 0;
$shop_id = isset($_GET['shop_id']) ? $_GET['shop_id'] : 0;
$region_id = isset($_GET['region_id']) ? $_GET['region_id'] : 0;
$region_name = isset($_GET['region_name']) ? $_GET['region_name'] : "";
$company_id = isset($_GET['company_id']) ? $_GET['company_id'] : 0;
$link_id = isset($_GET['link_id']) ? $_GET['link_id'] : 0;

if ($action == "system") {
    $system = array(
        "PHP_VERSION" => PHP_VERSION,
        "PHP_OS" => PHP_OS,
        "mysql_version" => mysqli_get_client_info($conn)
    );

    echo json_encode($system);
    exit;
} else if ($action == "system_edit") { //修改系统配置

    if ($_FILES && $conf_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("conf_img" => $conf_img));
        exit;
    }

    if ($_POST) {
        $data = array(
            "conf_name" => $_POST['conf_name'],
            "conf_content" => $_POST['conf_content'],
            "conf_copyright" => $_POST['conf_copyright'],
            "conf_email" => $_POST['conf_email'],
            "conf_phone" => $_POST['conf_phone']
        );

        if (isset($_POST['conf_img']) && !empty($_POST['conf_img'])) {
            $data['conf_img'] = $_POST['conf_img'];
        }

        $affect_id = update("{$pre_}config", $data, "conf_id = 1");

        if ($affect_id)  //修改成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }
    }

    $sql = "SELECT * FROM {$pre_}config WHERE conf_id = 1";
    $system = getOne($sql);
    echo json_encode($system);
    exit;
} else if ($action == "food_count") {  //食品总数
    $sql = "SELECT COUNT(*) AS c FROM {$pre_}food";
    $food_count = getOne($sql);
    echo json_encode($food_count);
    exit;
} else if ($action == "food_list") { //食品数据
    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}food AS food LEFT JOIN {$pre_}catefood AS cate ON food.fcate_id = cate.fcate_id ORDER BY food.food_id DESC LIMIT $start,$limit";
    $food_list = getAll($sql);
    echo json_encode($food_list);
    exit;
} else if ($action == "food_cate") {    //食品分类
    $sql = "SELECT * FROM {$pre_}catefood";
    $cate_list = getAll($sql);
    echo json_encode($cate_list);
    exit;
} else if ($action == "food_add") {     // 食品添加

    if ($_FILES && $_FILES['file']['error'] == 0 && $food_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("food_img" => $food_img));
        exit;
    }

    if ($_POST) {
        $data = array(
            "food_name" => $_POST['food_name'],
            "food_price" => $_POST['food_price'],
            "food_time" => strtotime($_POST['food_time']),
            "food_content" => $_POST['food_content'],
            "fcate_id" => $_POST['fcate_id'],
        );

        if (isset($_POST['food_img']) && !empty($_POST['food_img'])) {
            $data['food_img'] = $_POST['food_img'];
        }

        $insert_id = insert("{$pre_}food", $data);
        if ($insert_id)  //添加成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }


    }
} else if ($action == "food_detail") {    // 食品闲情页
    $sql = "SELECT * FROM {$pre_}food AS food LEFT JOIN {$pre_}catefood AS cate ON food.fcate_id = cate.fcate_id WHERE food.food_id = $food_id";
    $food_detail = getOne($sql);
    echo json_encode($food_detail);
    exit;
} else if ($action == "food_edit") {    //食品编辑
    if ($_FILES && $_FILES['file']['error'] == 0 && $food_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("food_img" => $food_img));
        exit;
    }

    if ($_POST) {
        $data = array(
            "food_name" => $_POST['food_name'],
            "food_price" => $_POST['food_price'],
            "food_time" => strtotime($_POST['food_time']),
            "food_content" => $_POST['food_content'],
            "fcate_id" => $_POST['fcate_id'],
        );

        if (isset($_POST['food_img']) && !empty($_POST['food_img'])) {
            $data['food_img'] = $_POST['food_img'];
        }

        $affect_id = update("{$pre_}food", $data, "food_id = $food_id");
        if ($affect_id)  //修改成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }


    }
} else if ($action == "food_delete") {      //食品删除

    if ($food_id) {

        $affect_id = delete("{$pre_}food", "food_id = $food_id");

        if ($affect_id) {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }

    } else {
        echo json_encode(array(false));
    }

} else if ($action == "article_count") {
    $sql = "SELECT COUNT(*) AS c FROM {$pre_}article";
    $article_count = getOne($sql);
    echo json_encode($article_count);
} else if ($action == "article_list") {

    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}article AS art LEFT JOIN {$pre_}article_cate AS cate ON art.artcate_id = cate.artcate_id LIMIT $start,$limit";
    $article_list = getAll($sql);
    echo json_encode($article_list);

} else if ($action == "article_cate") {

    $sql = "SELECT * FROM {$pre_}article_cate";
    $article_cate = getAll($sql);
    echo json_encode($article_cate);

} else if ($action == "article_add") {

    // 如果有图片上传 判断上传有无错误  并且    组装好图片的路径
    if ($_FILES && $_FILES['file']['error'] == 0 && $art_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("art_img" => $art_img));
        exit;
    }

    if ($_POST) {

        $data = array(
            "art_title" => $_POST['art_title'],
            "art_time" => strtotime($_POST['art_time']),
            "art_content" => $_POST['art_content'],
            "artcate_id" => $_POST['artcate_id'],
        );


        if (isset($_POST['art_img']) && !empty($_POST['art_img'])) {
            $data['art_img'] = $_POST['art_img'];
        }

        $insert_id = insert("{$pre_}article", $data);
        // echo json_encode($insert_id);
        if ($insert_id)  //修改成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }
    }

} else if ($action == "article_delete") {

    if ($art_id) {

        $affect_id = delete("{$pre_}article", "art_id = $art_id");

        if ($affect_id) {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }

    } else {
        echo json_encode(array(false));
    }
} else if ($action == "article_cate_add") {

    if ($_POST) {
        $data = array(
            "artcate_name" => $_POST['artcate_name']
        );

        $insert_id = insert("{$pre_}article_cate", $data);
        if ($insert_id)  //添加成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }


    }

} else if ($action == "article_cate_delete") {

    $affect_id = delete("{$pre_}article_cate", "article_id = $artcate_id");

    if ($artcate_id) {
        echo json_encode(array(true));
        exit;
    } else {
        echo json_encode(array(false));
        exit;
    }

} else if ($action == "login") {
    if ($_POST) {
        $admin_name = isset($_POST['admin_name']) ? $_POST['admin_name'] : "";
        $admin_pwd = isset($_POST['admin_pwd']) ? $_POST['admin_pwd'] : "";

        $admin_pwd = md5($admin_pwd);

        $sql = "SELECT * FROM {$pre_}admin WHERE admin_name = '$admin_name' AND admin_pwd = '$admin_pwd'";
        $admin_info = getOne($sql);
        echo json_encode($admin_info);
        exit;
    }
} else if ($action == "food_list_cate") {

    $sql = "SELECT * FROM {$pre_}catefood";
    $cate_list = getAll($sql);
    echo json_encode($cate_list);

} else if ($action == "food_cate_add") {

    if ($_POST) {
        $data = array(
            "fcate_name" => $_POST['fcate_name']
        );
    }

    $affect_id = insert("{$pre_}catefood", $data);

    if ($affect_id) {
        echo json_encode(array(true));
        exit;
    } else {
        echo json_encode(array(false));
    }
} else if ($action == "food_cate_one") {

    $sql = "SELECT * FROM {$pre_}catefood WHERE fcate_id = $fcate_id";
    $fcate = getOne($sql);
    echo json_encode($fcate);

} else if ($action == "food_cate_edit") {

    if ($_POST) {
        $data = array(
            "fcate_name" => $_POST['fcate_name'],
            "fcate_time" => strtotime($_POST['fcate_name'])
        );
    }

    $affect_id = update("{$pre_}catefood", $data, "fcate_id = $fcate_id");

    if ($affect_id) {
        echo json_encode(array(true));
        exit;
    } else {
        echo json_encode(array(false));
        exit;
    }

} else if ($action == "food_cate_delete") {

    $affect_id = delete("{$pre_}catefood", "fcate_id = $fcate_id");

    if ($affect_id) {
        echo json_encode(array(true));
        exit;
    } else {
        echo json_encode(array(false));
        exit;
    }
} else if ($action == "shop_count") {

    $sql = "SELECT COUNT(*) AS c FROM {$pre_}shop";
    $food_count = getOne($sql);
    echo json_encode($food_count);

} else if ($action == "shop_list") {

    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}shop AS shop LEFT JOIN {$pre_}region AS region ON shop.region_id = region.region_id ORDER BY shop.shop_id ASC LIMIT $start,$limit";
    $shop_list = getAll($sql);
    echo json_encode($shop_list);

} else if ($action == "shop_region") {

    $sql = "SELECT * FROM {$pre_}region";
    $shop_region = getAll($sql);
    echo json_encode($shop_region);

} else if ($action == "shop_add") {

    if ($_FILES && $_FILES['file']['error'] == 0 && $shop_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("shop_img" => $shop_img));
        exit;
    }



    if ($_POST) {
        $data = array(
            "shop_name" => $_POST['shop_name'],
            "shop_phone" => $_POST['shop_phone'],
            "shop_address" => $_POST['shop_address'],
            "region_id" => $_POST['region_id'],
            "shop_fax" => $_POST['shop_fax'],
        );

        if (isset($_POST['shop_img']) && !empty($_POST['shop_img'])) {
            $data['shop_img'] = $_POST['shop_img'];
        }

        $insert_id = insert("{$pre_}shop", $data);
        if ($insert_id)  //添加成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }


    }


} else if ($action == "shop_region_one") {

    if ($shop_id) {

        $sql = "SELECT * FROM {$pre_}shop AS shop LEFT JOIN {$pre_}region AS region ON shop.region_id = region.region_id WHERE shop_id = $shop_id";
        $shop_list_one = getOne($sql);
        echo json_encode($shop_list_one);
        exit;

    }

} else if ($action == "shop_edit") {

    //选择图片
    if ($_FILES && $_FILES['file']['error'] == 0 && $shop_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("shop_img" => $shop_img));
        exit;
    }

    if ($_POST) {
        $data = array(
            "shop_name" => $_POST['shop_name'],
            "shop_phone" => $_POST['shop_phone'],
            "shop_address" => $_POST['shop_address'],
            "shop_fax" => $_POST['shop_fax'],
            "region_id" => $_POST['region_id'],
        );

        if (isset($_POST['shop_img']) && !empty($_POST['shop_img'])) {
            $data['shop_img'] = $_POST['shop_img'];
        }

        $affect_id = update("{$pre_}shop", $data, "shop_id = $shop_id");


        if ($affect_id)  //修改成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }


    }

} else if ($action == "region_count") {

    $sql = "SELECT COUNT(*) AS c FROM {$pre_}region";
    $region_count = getOne($sql);
    echo json_encode($region_count);

} else if ($action == "region_list") {

    $start = ($page - 1) * $limit;
    $sql = "SELECT * FROM {$pre_}region LIMIT $start,$limit";
    $region_list = getAll($sql);
    echo json_encode($region_list);

} else if ($action == "region_list_one") {

    $sql = "SELECT * FROM {$pre_}region WHERE region_id = $region_id";
    $region_list_one = getOne($sql);
    echo json_encode($region_list_one);
    exit;



} else if ($action == "region_edit") {

    if (!empty($region_name)) {

        $data = array(
            "region_name" => $region_name
        );

        $affect_id = update("{$pre_}region", $data, "region_id = $region_id");

        if ($affect_id) {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }
    }
} else if ($action == "region_add") {

    if (!empty($region_name)) {

        $data = array(
            "region_name" => $region_name
        );

    }

    $affect_id = insert("{$pre_}region", $data);

    if ($affect_id) {

        echo json_encode(array(true));
        exit;

    } else {
        echo json_encode(array(false));
        exit;

    }


} else if ($action == "region_delete") {

    $affect_id = delete("{$pre_}region", "region_id = $region_id");

    if ($affect_id) {
        echo json_encode(array(true));
        exit;
    } else {
        echo json_encode(array(false));
        exit;
    }

} else if ($action == "link_list") {

    $sql = "SELECT * FROM {$pre_}link";
    $link_list = getAll($sql);
    echo json_encode($link_list);
    exit;
} else if ($action == "company_list") {

    $sql = "SELECT * FROM {$pre_}company";
    $company = getAll($sql);
    echo json_encode($company);
    exit;

} else if ($action == "company_add") {

    // 如果有图片上传 判断上传有无错误  并且    组装好图片的路径
    if ($_FILES && $_FILES['file']['error'] == 0 && $company_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("company_img" => $company_img));
        exit;
    }

    if ($_POST) {
        $data = array(
            "company_name" => $_POST['company_name'],
            "company_phone" => $_POST['company_phone'],
            "company_time" => time(),
            "company_address" => $_POST['company_address'],
            "company_fax" => $_POST['company_fax'],
            "company_email_code" => $_POST['company_email_code'],
        );

        // 验证是否传过来图片
        if (isset($_POST['company_img']) && !empty($_POST['company_img'])) {
            $data['company_img'] = $_POST['company_img'];
        }

        $insert_id = insert("{$pre_}company", $data);
        if ($insert_id)  //添加成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }
    }

} else if ($action == "company_list_one") {

    if ($company_id) {

        $sql = "SELECT * FROM {$pre_}company WHERE company_id = $company_id";
        $company = getOne($sql);
        echo json_encode($company);
        exit;

    }

} else if ($action == "company_edit") {

    if ($_FILES && $_FILES['file']['error'] == 0 && $company_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("company_img" => $company_img));
        exit;
    }


    if ($_POST) {
        $data = array(
            "company_name" => $_POST['company_name'],
            "company_phone" => $_POST['company_phone'],
            "company_address" => strtotime($_POST['company_address']),
            "company_fax" => $_POST['company_fax'],
            "company_time" => time() * 1000,
            "company_email_code" => $_POST['company_email_code'],
        );

        if (isset($_POST['company_img']) && !empty($_POST['company_img'])) {
            $data['company_img'] = $_POST['company_img'];
        }

        $affect_id = update("{$pre_}company", $data, "company_id = $company_id");
        if ($affect_id)  //修改成功
        {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }
    }

} else if ($action == "company_delete") {

    if ($company_id) {

        $affect_id = delete("{$pre_}company", "company_id = $company_id");

        if ($affect_id) {
            echo json_encode(array(true));
            exit;
        } else {
            echo json_encode(array(false));
            exit;
        }

    }

} else if ($action == "link_delete") {

    if ($link_id) {
        $affect_id = delete("{$pre_}link","link_id = $link_id");
        if ($affect_id) {
            echo json_encode(array(true));
        } else {
            echo json_encode(array(false));
        }
    }
} else if ($action == "link_list_one") {
    if ($link_id) {
        $sql = "SELECT * FROM {$pre_}link WHERE link_id = $link_id";
        $link = getOne($sql);
        echo json_encode($link);
    }
} else if ($action == "link_edit") {

    if ($_FILES && $_FILES['file']['error'] == 0 && $link_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("link_img" => $link_img));
    }

    if ($_POST) {
        $data = array(
            "link_url" => $_POST['link_url']
        );
        if (isset($_POST['link_img']) && !empty($_POST['link_img'])) {
            $data['link_img'] = $_POST['link_img'];
        }
        $affect_id = update("{$pre_}link",$data,"link_id = $link_id");
        if ($affect_id) {
            echo json_encode(array(true));
        } else {
            echo json_encode(array(false));
        }
    }

} else if ($action == "link_add") {

    if ($_FILES && $_FILES['file']['error'] == 0 && $link_img = upload_file("file", "../Assets/uploads/")) {
        echo json_encode(array("link_img" => $link_img));
    }

    if ($_POST) {
        $data = array(
            "link_url" => $_POST['link_url']
        );
        if (isset($_POST['link_img']) && !empty($_POST['link_img'])) {
            $data['link_img'] = $_POST['link_img'];
        }
        $affect_id = insert("{$pre_}link",$data);
        if ($affect_id) {
            echo json_encode(array(true));
        } else {
            echo json_encode(array(false));
        }
    }

}
?>
