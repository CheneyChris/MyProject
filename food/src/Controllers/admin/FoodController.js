//主页面控制器
food.controller("FoodListController", function(
    $scope,
    $http,
    page,
    $rootScope
) {
    $rootScope.food_id = 0;

    //获取总条数
    $http({
        method: "GET",
        url: "../Api/admin.php?action=food_count"
    }).then(function(result) {
        $scope.totalItems = result.data.c;
    });

    $scope.currentPage = 1;
    $scope.bigTotalItems = 10;
    $scope.maxSize = 5;

    var url = "../Api/admin.php?action=food_list";

    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        $scope.food_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                $scope.food_list = result;
            }
        );
    };

    $scope.deleteFood = function(food_id) {
        $rootScope.food_id = food_id;
    };
});

// food_add
food.controller("FoodAddController", function(
    $scope,
    $http,
    Upload,
    $location
) {
    $http({
        method: "get",
        url: "../Api/admin.php?action=food_cate"
    }).then(result => {
        console.log(result);
        $scope.cate_list = result.data;
    });

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.food.food_img) {
            // 图片名称     xxx.jpg
            console.log($scope.food.food_img);
            Upload.upload({
                url: "../Api/admin.php?action=food_add",
                file: $scope.food.food_img
            }).success(function(result) {
                $scope.food.food_img = "uploads/" + result.food_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=food_add",
            data: $scope.food,
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
            if (result.data) {
                $location.path("food_list");
            } else {
                alert("添加失败");
                $location.path("food_add");
            }
        });
    };
});

//删除食品
food.controller("FoodDeleteController", function(
    $http,
    $stateParams,
    $location
) {
    console.log($stateParams.food_id);
    $http({
        url:
            "../Api/admin.php?action=food_delete&food_id=" +
            $stateParams.food_id,
        method: "get"
    }).then(function(result) {
        if (result.data) {
            $location.path("food_list");
        } else {
            alert("删除失败");
            $location.path("food_list");
        }
    });
});

//编辑食品
food.controller("FoodEditController", function(
    $scope,
    $http,
    Upload,
    $location,
    $stateParams,
    time
) {
    console.log($stateParams.food_id);
    //查询出当前产品
    $http({
        method: "get",
        url:
            "../Api/admin.php?action=food_detail&food_id=" +
            $stateParams.food_id
    }).then(function(result) {
        console.log(result.data);
        $scope.food = result.data;
        $scope.food.food_time = time.timestampToTime($scope.food.food_time);
    });

    //查询食品分类
    $http({
        method: "GET",
        url: "../Api/admin.php?action=food_cate"
    }).then(function(result) {
        $scope.cate_list = result.data;
    });

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.food.food_img) {
            console.log($scope.food.food_img.name);
            Upload.upload({
                url: "../Api/admin.php?action=food_edit",
                file: $scope.food.food_img
            }).success(function(result) {
                $scope.food.food_img = "uploads/" + result.food_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url:
                "../Api/admin.php?action=food_edit&food_id=" +
                $stateParams.food_id,
            data: $scope.food,
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
            if (result.data) {
                $location.path("food_list");
            } else {
                alert("添加失败");
                $location.path("food_edit/" + $stateParams.food_id);
            }
        });
    };
});

// 食品分类
food.controller("FoodListCateController", function($http, $scope, $rootScope) {
    $http({
        method: "get",
        url: "../Api/admin.php?action=food_list_cate"
    }).then(result => {
        // console.log(result);
        $scope.cate_list = result.data;
    });

    // 点击x 然后把他的分类的id 保存到rootScope中
    $scope.deleteFoodCate = function(fcate_id) {
        $rootScope.fcate_id = fcate_id;
    };
});

// 食品分类添加
food.controller("FoodCateAddController", function($scope, $http, $location) {
    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=food_cate_add",
            data: $scope.foodcate,
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
            if (result.data[0]) {
                $location.path("food_list_cate");
            } else {
                alert("添加失败");
                $location.path("food_cate_add");
            }
        });
    };
});

// 食品分类编辑
food.controller("FoodCateEditController", function(
    $scope,
    $http,
    $location,
    $stateParams
) {
    console.log($stateParams.fcate_id);
    $http({
        method: "get",
        url:
            "../Api/admin.php?action=food_cate_one&fcate_id=" +
            $stateParams.fcate_id
    }).then(result => {
        $scope.foodcate = result.data;
    });

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url:
                "../Api/admin.php?action=food_cate_edit&fcate_id=" +
                $stateParams.fcate_id,
            data: $scope.foodcate,
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
                $location.path("food_list_cate");
            } else {
                alert("添加失败");
                $location.path("food_cate_edit");
            }
        });
    };
});

// 食品分类删除
food.controller("FoodCateDeleteController", function(
    $http,
    $stateParams,
    $location
) {
    console.log($stateParams.fcate_id);

    $http({
        method: "get",
        url: "../Api/admin.php?action=food_cate_delete&fcate_id=" +  $stateParams.fcate_id
    }).then(result => {
        if (result.data[0]) {
            $location.path("food_list_cate");
        } else {
            alert("删除失败");
            $locaton.path("food_list_cate");
        }
    });
});
