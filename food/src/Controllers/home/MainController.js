//广告图控制器
food.controller("BannerController", function($scope, $http) {
    //请求广告图数据
    $http({
        method: "GET",
        url: "../Api/home.php?action=banner"
    }).then(function(result) {
        //php返回的数据用一个参数接收
        $scope.banner_list = result.data;
    });
});

//首页控制器
food.controller("HomeController", function($scope, $http, $sce) {
    //请求新品推荐
    $http({
        method: "GET",
        url: "../Api/home.php?action=news_food"
    }).then(function(result) {
        $scope.news_food = result.data;
    });

    //公司简介
    $http({
        method: "GET",
        url: "../Api/home.php?action=about_us"
    }).then(function(result) {
        $scope.about = result.data;
        $scope.about.art_content = $sce.trustAsHtml($scope.about.art_content);
    });

    //新闻资讯
    $http({
        method: "GET",
        url: "../Api/home.php?action=home_news"
    }).then(function(result) {
        $scope.home_news = result.data;
    });

    //新闻资讯
    $http({
        method: "GET",
        url: "../Api/home.php?action=home_news_one"
    }).then(function(result) {
        $scope.home_news_one = result.data;
    });
});

food.controller("CompanyController", function($scope) {
    console.log("company_list");
});

// 友情链接
food.controller("LinkController", function($scope, $http) {
    $http({
        method: "GET",
        url: "../Api/home.php?action=link"
    }).then(result => {
        // 友情链接的图片
        $scope.link_img = result.data[0];

        // 友情链接的文字
        $scope.link_text = result.data[1];
        // console.log(result.data);
    });
});

// 品牌故事
food.controller("ArticleController", function(
    $scope,
    $http,
    $stateParams,
    $sce
) {
    $http({
        method: "get",
        url: "../Api/home.php?action=article_list&art_id=" + $stateParams.art_id
    }).then(result => {
        $scope.article_list = result.data;

        //对文章的内容进行处理，在前台可以输出html标签
        $scope.article_list.article_content = $sce.trustAsHtml(
            $scope.article_list.art_content
        );
    });
});

// 美食系列
food.controller("FoodListController", function($http, $scope, $location, page) {
    // 获取食品分类
    $http({
        method: "get",
        url: "../Api/home.php?action=food_cate"
    }).then(result => {
        $scope.cate_list = result.data;
    });

    // 获取总数
    $http({
        method: "get",
        url: "../Api/home.php?action=food_count"
    }).then(result => {
        $scope.totalItems = result.data.c;
    });

    $scope.currentPage = 1; //当前默认页码
    $scope.bigTotalItems = 9; //每页显示条数
    $scope.maxSize = 5; //中间的页码数

    //判断 $location 所获取的地址 是不是等于 == /food_list
    $scope.food_active = $location.path() == "./food_list" ? true : false;

    //每次页面拿数据所请求的地址
    var url = "../Api/home.php?action=food_list";

    //调用自定义分页服务里面的方法
    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(result => {
        $scope.food_list = result;
    });

    // 每次改变搜索都会调用这个方法
    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            result => {
                $scope.food_list = result;
            }
        );
    };
});

// 美食系列按食品分类
food.controller("FoodCateController", function(
    $http,
    $scope,
    $stateParams,
    page
) {
    // 食品分类
    $http({
        method: "get",
        url: "../Api/home.php?action=food_cate"
    }).then(result => {
        $scope.cate_list = result.data;
    });

    // 获取总数
    $http({
        method: "get",
        url:
            "../Api/home.php?action=food_count$fcate_id=" +
            $stateParams.fcate_id
    }).then(result => {
        $scope.totalItems = result.data.c;
    });

    $scope.currentPage = 1;
    $scope.bigTotaItems = 8;
    $scope.maxSize = 5;
    $scope.fcate_id = $stateParams.fcate_id;

    var url =
        "../Api/home.php?action=food_list&fcate_id=" + $stateParams.fcate_id;

    page.getData(url, $scope.currentPage, $scope.bigTotaItems).then(result => {
        $scope.food_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope, currentPage, $scope, bigTotaItems).then(
            result => {
                $scope.food_list = result;
            }
        );
    };
});

// 美食系列 按食品名称
food.controller("FoodNameController", function(
    $scope,
    $http,
    $stateParams,
    page
) {
    // 获取食品分类
    $http({
        method: "get",
        url: "../Api/home.php?action=food_cate"
    }).then(result => {
        $scope.cate_list = result.data;
    });

    // 获取食品总数
    $http({
        method: "get",
        url: "../Api/home.php?action=food_count"
    }).then(result => {
        $scope.totalItems = result.data.c;
    });

    $scope.currentPage = 1;
    $scope.bigTotaItems = 8;
    $scope.maxSize = 5;
    $scope.food_active = true;
    $scope.food_name = $stateParams.food_name;

    var url =
        "../Api/home.php?action=food_list&food_name=" + $stateParams.food_name;

    page.getData(url, $scope.currentPage, $scope.bigTotaItems).then(result => {
        $scope.food_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotaItems).then(
            result => {
                $scope.food_list = result;
            }
        );
    };
});

// 食品详情页
food.controller("FoodInfoController", function($scope, $http, $stateParams) {
    $http({
        method: "get",
        url: "../Api/home.php?action=food_info&food_id=" + $stateParams.food_id
    }).then(result => {
        $scope.food_info = result.data;
    });
});

// 新闻
food.controller("NewsController", function($scope, $http, page) {
    // 获取新闻
    $http({
        method: "get",
        url: "../Api/home.php?action=news"
    }).then(result => {
        $scope.news_list = result.data;
    });

    // 获取新闻总数
    $http({
        method: "get",
        url: "../Api/home.php?action=news_count"
    }).then(result => {
        // 新闻总条数
        $scope.totalItems = result.data.c;
    });

    //设置数据结构
    $scope.currentPage = 1; //当前页码
    $scope.bigTotalItems = 4; //每页显示多少条
    $scope.maxSize = 5; //中间的页码数

    let url = "../Api/home.php?action=news";

    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        $scope.news_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                $scope.news_list = result;
            }
        );
    };
});

// 新闻详情页
food.controller("NewsInfoController", function($scope, $http, $stateParams) {
    $http({
        method: "get",
        url: "../Api/home.php?action=news_info&news_id=" + $stateParams.news_id
    }).then(result => {
        $scope.news_info = result.data;
    });
});

//店面
food.controller("ShopListController", function($scope, $http, page, $location) {
    
    $http({
        method: "get",
        url: "../Api/home.php?action=shop_list"
    }).then(result => {
        $scope.shop_list = result.data;
    });

    //获取总数
    $http({
        method: "get",
        url: "../Api/home.php?action=shop_count"
    }).then(result => {
        $scope.totalItems = result.data.c;
    });

    // 获取地区分类
    $http({
        method: "get",
        url: "../Api/home.php?action=region_list"
    }).then(result => {
        $scope.region_list = result.data;
    });

    //设置数据结构
    $scope.currentPage = 1; //当前页码
    $scope.bigTotalItems = 9; //每页显示多少条
    $scope.maxSize = 5; //中间的页码数

    //判断 $location 所获取的地址 是不是等于 == /food_list
    // 为true 加一个 class名 false删除class名
    $scope.shop_active = $location.path() == "/shop_list" ? true : false;

    //每次页面拿数据所请求的地址
    var url = "../Api/home.php?action=shop_list";

    //调用自定义分页服务里面的方法
    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        $scope.shop_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                $scope.shop_list = result;
            }
        );
    };
});

// 按店面地区分类
food.controller("ShopRegionController", function(
    $http,
    $scope,
    page,
    $stateParams
) {
    // 获取地区分类
    $http({
        method: "get",
        url: "../Api/home.php?action=region_list"
    }).then(result => {
        $scope.region_list = result.data;
    });

    // 获取总数
    $http({
        method: "get",
        url:
            "../Api/home.php?action=shop_count&region_id=" +
            $stateParams.region_id
    }).then(result => {
        $scope.totalItems = result.data.c;
    });

    $scope.currentPage = 1;
    $scope.bigTotaItems = 9;
    $scope.maxSize = 5;
    $scope.region_id = $stateParams.region_id;

    let url =
        "../Api/home.php?action=shop_list&region_id=" + $stateParams.region_id;

    page.getData(url, $scope.currentPage, $scope.bigTotaItems).then(result => {
        $scope.shop_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                $scope.shop_list = result;
            }
        );
    };
});

//店面列表 按店面名称
food.controller("ShopNameController", function(
    $scope,
    $http,
    page,
    $stateParams
) {
    //获取地区分类
    $http({
        method: "get",
        url: "../Api/home.php?action=region_list"
    }).then(function(result) {
        $scope.region_list = result.data;
    });

    //获取总数
    $http({
        method: "get",
        url:
            "../Api/home.php?action=shop_count&shop_name=" +
            $stateParams.shop_name
    }).then(function(result) {
        $scope.totalItems = result.data.c;
    });

    //设置数据结构
    $scope.currentPage = 1; //当前页码
    $scope.bigTotalItems = 9; //每页显示多少条
    $scope.maxSize = 5; //中间的页码数
    $scope.shop_active = true;
    $scope.shop_name = $stateParams.shop_name;

    //每次页面拿数据所请求的地址
    var url =
        "../Api/home.php?action=shop_list&shop_name=" + $stateParams.shop_name;

    //调用自定义分页服务里面的方法
    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        $scope.shop_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                $scope.shop_list = result;
            }
        );
    };
});

//商店详细页面
food.controller("ShopDetailController", function(
    $scope,
    $http,
    $stateParams,
    $sce
) {
    //食品详细界面
    $http({
        url:
            "../Api/home.php?action=shop_detail&shop_id=" +
            $stateParams.shop_id,
        method: "get"
    }).then(result => {
        $scope.shop_detail = result.data;
        //$scope.food_detail.food_content = $sce.trustAsHtml($scope.food_detail.food_content);
    });
});

// 关于我们
food.controller("AboutUsController", function($http, $stateParams, $scope) {
    $http({
        method: "get",
        url: "../Api/home.php?action=company_list"
    }).then(result => {
        $scope.about_us = result.data;
    });
});
