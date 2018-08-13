// 公司管理
food.controller("CompanyListController",function ($http,$scope,$rootScope) {

    $http({
        method : "get",
        url: "../Api/admin.php?action=company_list"
    }).then(result => {
        // console.log(result);
        $scope.company_list = result.data;
    });

    $scope.company_delete = function (company_id) {
        $rootScope.company_id = company_id;
    }
});

// 添加公司
food.controller("CompanyAddController", function ($http,$scope,$location,Upload) {

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.company.company_img) {
            // 图片名称     xxx.jpg
            console.log($scope.company.company_img);
            Upload.upload({
                url: "../Api/admin.php?action=company_add",
                file: $scope.company.company_img
            }).success(function(result) {
                $scope.company.company_img = "uploads/" + result.company_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=company_add",
            data: $scope.company,
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
            console.log(result.data[0]);
            if (result.data[0]) {
                $location.path("company_list");
            } else {
                alert("添加失败");
                $location.path("company_add");
            }
        });
    };


});


// 编辑公司
food.controller("CompanyEditController", function ($http,$scope,$stateParams,$location,Upload) {

    // console.log($stateParams.company_id);
    $http({
        method : "get",
        url : "../Api/admin.php?action=company_list_one&company_id=" + $stateParams.company_id
    }).then(result => {
        // console.log(result);
        $scope.company = result.data;
    }); 

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.company.company_img) {
            // 图片名称     xxx.jpg
            console.log($scope.company.company_img);
            Upload.upload({
                url: "../Api/admin.php?action=company_edit",
                file: $scope.company.company_img
            }).success(function(result) {
                $scope.company.company_img = "uploads/" + result.company_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=company_edit&company_id=" + $stateParams.company_id,
            data: $scope.company,
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
            console.log(result);
            if (result.data[0]) {
                $location.path("company_list");
            } else {
                alert("添加失败");
                $location.path("company_edit/" + $stateParams.company_id);
            }
        });
    };


});

// 删除公司
food.controller("CompanyDeleteController", function ($http,$scope,$stateParams,$location) {

    // console.log($stateParams.company_id);
    $http({
        method : "get",
        url : "../Api/admin.php?action=company_delete&company_id=" + $stateParams.company_id
    }).then(result => {
        console.log(result);
        if (result.data[0]) {
            $location.path("company_list");
        } else {
            alert("删除失败");
            $location.path("company_list");
        }

    });


});