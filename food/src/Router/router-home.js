// 用来设置应用的路由
function config($urlRouterProvider, $stateProvider) {
    //$routeProvider 管理路由跳转的服务
    //$stateProvider 状态管理
    //$urlRouterProvider 用于监听$location对象变化 当url地址发生改变的时候,就会去某个列表当中去匹配url地址

    //当访问不存在的url地址的时候，或者是没匹配到的url地址的时候，就默认访问到该界面去
    $urlRouterProvider.otherwise("/home");
    //配置路由的状态
    //当访问到/home的时候加载对应的控制器和模板
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "../src/Views/home/index.html",
            controller: "HomeController"
        })
        .state("company_list", {
            url: "/company_list",
            templateUrl: "../src/Views/home/company_list.html",
            controller: "CompanyController"
        })
        .state("article_list", {
            url: "/article_list/:art_id",
            templateUrl: "../src/Views/home/article_list.html",
            controller: "ArticleController"
        })
        .state("food_list", {   //默认查询所有食品
            url: "/food_list",
            templateUrl: "../src/Views/home/food_list.html",
            controller: "FoodListController",
        })
        .state("food_cate", {     //按食品分类查询
            url : "/food_list/:fcate_id",
            templateUrl : "../src/Views/home/food_list.html",
            controller : "FoodCateController"
        })
        .state("food_name", {      // 按食品名称查询
            url : "/food_list/:food_name",
            templateUrl : "../src/Views/home/food_list.html",
            controller : "FoodNameController"
        })
        .state("food_info", {
            url : "/food_info/:food_id",
            templateUrl : "../src/Views/home/food_info.html",
            controller : "FoodInfoController"
        })
        .state("news", {
            url : "/news",
            templateUrl:"../src/Views/home/news.html",
            controller : "NewsController"
        })
        .state("news_info",{
            url: "/news_info/:news_id",
            templateUrl:"../src/Views/home/news_info.html",
            controller : "NewsInfoController"
        })
        .state("shop",{     //店面列表页
            url : "/shop",
            templateUrl : "../src/Views/home/shop.html",
            controller : "ShopListController" 
        })
        .state("shop_region", { //按照区域查询
            url : "/shop/:region_id",
            templateUrl : "../src/Views/home/shop.html",
            controller : "ShopRegionController"
        })
        .state('shop_name',{  //按店面名称查询
            url:'/shop_name/:shop_name',
            templateUrl:"../src/Views/home/shop.html",
            controller:"ShopNameController"
        })
        .state('shop_detail',{  //店面详细页面
            url:'/shop_detail/:shop_id',
            templateUrl:"../src/Views/home/shop_detail.html",
            controller:"ShopDetailController"
        })
        .state('about_us', {
            url : "/about_us",
            templateUrl:"../src/Views/home/about_us.html",
            controller : "AboutUsController"
        });
}
//将配置选项设置到当前应用中去
food.config(config).run();
