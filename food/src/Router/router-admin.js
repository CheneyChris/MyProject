// 用来设置应用的路由
function config($urlRouterProvider, $stateProvider) {
    //$routeProvider 管理路由跳转的服务
    //$stateProvider 状态管理
    //$urlRouterProvider 用于监听$location对象变化 当url地址发生改变的时候,就会去某个列表当中去匹配url地址

    //当访问不存在的url地址的时候，或者是没匹配到的url地址的时候，就默认访问到该界面去
    $urlRouterProvider.otherwise("/main");

    //配置路由的状态
    //当访问到/home的时候加载对应的控制器和模板
    $stateProvider
        .state("main", {
            url: "/main",
            templateUrl: "../src/Views/admin/main.html",
            controller: "MainController"
        })
        .state("system", {
            url: "/system",
            templateUrl: "../src/Views/admin/system.html",
            controller: "SystemController"
        })
        .state("food_list", {
            url: "/food_list",
            templateUrl: "../src/Views/admin/food_list.html",
            controller: "FoodListController"
        })
        .state("food_edit", {
            url: "/food_edit/:food_id",
            templateUrl: "../src/Views/admin/food_edit.html",
            controller: "FoodEditController"
        })
        .state("food_add", {
            url: "/food_add",
            templateUrl: "../src/Views/admin/food_add.html",
            controller: "FoodAddController"
        })
        .state("food_delete", {
            url: "/food_delete/:food_id",
            // templateUrl: "../src/Views/admin/food_list.html",
            controller: "FoodDeleteController"
        })
        .state("article_list", {
            url: "/article_list",
            templateUrl: "../src/Views/admin/article_list.html",
            controller: "ArticleListController"
        })
        .state("article_add", {
            url: "/article_add",
            templateUrl: "../src/Views/admin/article_add.html",
            controller: "ArticleAddController"
        })
        .state("article_delete", {
            url: "/article_delete/:art_id",
            controller: "ArticleDeleteController"
        })
        .state("article_cate", {
            url: "/article_cate",
            templateUrl: "../src/Views/admin/article_cate.html",
            controller: "ArticleCateController"
        })
        .state("article_cate_add", {
            url: "/article_cate_add",
            templateUrl: "../src/Views/admin/article_cate_add.html",
            controller: "ArticleCateAddController"
        })
        .state("art_cate_delete", {
            url: "/art_cate_delete/:artcate_id",
            controller: "ArticleCateDeleteController"
        })
        .state("login", {
            url: "/login",
            templateUrl: "../src/Views/admin/login.html",
            controller: "LoginController"
        })
        .state("food_list_cate", {
            url: "/food_list_cate",
            templateUrl: "../src/Views/admin/food_list_cate.html",
            controller: "FoodListCateController"
        })
        .state("food_cate_add", {
            url: "/food_cate_add",
            templateUrl: "../src/Views/admin/food_cate_add.html",
            controller: "FoodCateAddController"
        })
        .state("food_cate_edit", {
            url: "/food_cate_edit/:fcate_id",
            templateUrl: "../src/Views/admin/food_cate_edit.html",
            controller: "FoodCateEditController"
        })
        .state("food_cate_delete", {
            url: "/food_cate_delete/:fcate_id",
            controller: "FoodCateDeleteController"
        })
        .state("shop_list", {
            url: "/shop_list",
            templateUrl: "../src/Views/admin/shop_list.html",
            controller: "ShopListController"
        })
        .state("shop_add", {
            url: "/shop_add",
            templateUrl: "../src/Views/admin/shop_add.html",
            controller: "ShopAddController"
        })
        .state("shop_edit", {
            url: "/shop_edit/:shop_id",
            templateUrl: "../src/Views/admin/shop_edit.html",
            controller: "ShopEditController"
        })
        .state("region_list", {
            url: "/region_list",
            templateUrl: "../src/Views/admin/region_list.html",
            controller: "RegionListController"
        })
        .state("region_edit", {
            url: "/region_edit/:region_id",
            templateUrl: "../src/views/admin/region_edit.html",
            controller: "RegionEditController"
        })
        .state("region_add", {
            url: "/region_add",
            templateUrl: "../src/Views/admin/region_add.html",
            controller: "RegionAddController"
        })
        .state("region_delete", {
            url: "/region_delete/:region_id",
            controller: "RegionDeleteController"
        })
        .state("link_list", {
            url: "/link_list",
            templateUrl: "../src/Views/admin/link_list.html",
            controller: "LinkListController"
        })
        .state("company_list", {
            url: "/company_list",
            templateUrl: "../src/Views/admin/company_list.html",
            controller: "CompanyListController"
        })
        .state("company_add", {
            url: "/company_add",
            templateUrl: "../src/Views/admin/company_add.html",
            controller: "CompanyAddController"
        })
        .state("company_edit", {
            url: "/company_edit/:company_id",
            templateUrl: "../src/Views/admin/company_edit.html",
            controller: "CompanyEditController"
        })
        .state("company_delete", {
            url: "/company_delete/:company_id",
            controller: "CompanyDeleteController"
        })
        .state("link_delete",{
            url : "/link_delete/:link_id",
            controller : "LinkDeleteController"
        })
        .state("link_edit", {
            url : "/link_edit/:link_id",
            templateUrl : "../src/Views/admin/link_edit.html",
            controller : "linkEditController"
        })
        .state("link_add", {
            url : "/link_add",
            templateUrl : "../src/Views/admin/link_add.html",
            controller : "LinkAddController"
        });
}

//将配置选项设置到当前应用中去
food.config(config).run();
