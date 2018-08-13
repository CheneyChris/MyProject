// 店面列表
food.controller("ShopListController", function($scope, $http, page) {
    $http({
        method: "get",
        url: "../Api/admin.php?action=shop_count"
    }).then(result => {
        $scope.totalItems = result.data.c;
        // console.log(result.data.c);
    });

    $scope.currentPage = 1;
    $scope.bigTotalItems = 10;
    $scope.maxSize = 5;

    var url = "../Api/admin.php?action=shop_list";

    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        // console.log(result);
        $scope.shop_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                // console.log(result);
                $scope.shop_list = result;
            }
        );
    };
});

// 店面添加
food.controller("ShopAddController", function ($http, $scope,$location,Upload) {

    
    $http({
        method:"get",
        url : "../Api/admin.php?action=shop_region"
    }).then( result => {
        $scope.shop_region = result.data;
    });

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.shop.shop_img) {
            // 图片名称     xxx.jpg
            console.log($scope.shop.shop_img);
            Upload.upload({
                url: "../Api/admin.php?action=shop_add",
                file: $scope.shop.shop_img
            }).success(function(result) {
                // console.log(result);
                $scope.shop.shop_img = "uploads/" + result.shop_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=shop_add",
            data: $scope.shop,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(
                        encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])
                    );
                }

                return str.join("&");
            }
        }).then(function(result) {
            // console.log(result.data[0]);
            if (result.data) {
                $location.path("shop_list");
            } else {
                alert("添加失败");
                $location.path("shop_add");
            }
        });
    };

    






});

// 店面编辑
food.controller("ShopEditController", function ($http, $scope,$location,$stateParams,Upload) {

    // console.log($stateParams);.

    // 通过店面id获取店铺分类
    $http({
        method:"get",
        url : "../Api/admin.php?action=shop_region"
    }).then( result => {
        // console.log(result);
        $scope.shop_region = result.data;
    });

    // 通过店面id 获取店铺所有信息
    $http({
        method:"get",
        url : "../Api/admin.php?action=shop_region_one&shop_id=" + $stateParams.shop_id
    }).then( result => {
        // console.log(result);
        $scope.shop = result.data;
    });

    //上传图片文件
    $scope.uploadImg = function() {
        if ($scope.shop.shop_img) {
            console.log($scope.shop.shop_img.name);
            Upload.upload({
                url: "../Api/admin.php?action=shop_edit",
                file: $scope.shop.shop_img
            }).success(function(result) {
                $scope.shop.shop_img = "uploads/" + result.shop_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {

        // console.log($scope.shop);
        // console.log($stateParams.shop_id);

        $http({
            method: "POST",
            url:
                "../Api/admin.php?action=shop_edit&shop_id=" + $stateParams.shop_id,
            data: $scope.shop,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(
                        encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])
                    );
                }

                return str.join("&");
            }
        }).then(function(result) {

            // console.log(result.data[0]);
            if (result.data[0]) {
                $location.path("shop_list");
            } else {
                alert("添加失败");
                $location.path("shop_edit/" + $stateParams.shop_id);
            }
        });
    };

});


// 地区分类管理
food.controller("RegionListController",function ($http,$scope,page,$rootScope) {

    $http({
        method : "get",
        url : "../Api/admin.php?action=region_count"
    }).then(result => {
        $scope.totalItems = result.data.c; 
    });

    $scope.currentPage = 1;
    $scope.bigTotalItems = 5;
    $scope.maxSize = 5;

    var url = "../Api/admin.php?action=region_list";

    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        // console.log(result);
        $scope.region_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                console.log(result);
                $scope.region_list = result;
            }
        );
    };

    $scope.region_delete = function (region_id) {

        $rootScope.region_id = region_id;

    }
});

// 地区分类编辑
food.controller("RegionEditController", function ($http ,$scope,$location,$stateParams) {

    // console.log($stateParams.region_id);
    $http({
        method : "get",
        url : "../Api/admin.php?action=region_list_one&region_id=" + $stateParams.region_id
    }).then(result => {
        // console.log(result);
        $scope.region = result.data;
    });

    // 点击发送请求 get 方式
    $scope.get_region = function (region_name) {
        $scope.region_name = region_name;
        // console.log($scope.region_name);
        $http({
            method : "get",
            url : "../Api/admin.php?action=region_edit&region_name=" + $scope.region_name + "&region_id=" + $stateParams.region_id
        }).then(result => {
            if (result.data[0]) {
                $location.path("region_list");
            }else {
                $location.path("region_edit");
            }
        });
    }
});

// 地区分类添加
food.controller("RegionAddController", function ($http,$scope,$location) {

    // 点击发送请求 get 方式
    $scope.add_region = function (region_name) {
        $scope.region_name = region_name;
        // console.log($scope.region_name);
        $http({
            method : "get",
            url : "../Api/admin.php?action=region_add&region_name=" + $scope.region_name
        }).then(result => {
            if (result.data[0]) {
                $location.path("region_list");
            }else {
                $location.path("region_add");
            }
        });
    }

});

// 地区分类删除
food.controller("RegionDeleteController", function ($http,$scope,$location,$stateParams) {

    // console.log($stateParams.region_id);

    $http({
        method : "get",
        url : "../Api/admin.php?action=region_delete&region_id=" + $stateParams.region_id
    }).then(result => {
        console.log(result.data[0]);
        if (result.data[0]) {
            $location.path("region_list");
        }else {
            alert("删除失败");
            $location.path("region_list");
        }

    });

});