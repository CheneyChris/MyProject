// 友情链接
food.controller("LinkListController",function ($http,$scope,$rootScope) {

    $scope.link_delete = function (link_id) {
        $rootScope.link_id = link_id;
    }
    $http({
        method: "get",
        url : "../Api/admin.php?action=link_list"
    }).then(result => {
        // console.log(result);
        $scope.link_list = result.data;
    });
});

food.controller("LinkDeleteController", function ($scope,$rootScope,$http,$location,$stateParams) {
    // console.log($stateParams.link_id);
    $http({
        method : "get",
        url : "../Api/admin.php?action=link_delete&link_id=" + $stateParams.link_id
    }).then(result => {
        console.log(result);
        if (result.data[0]) {
            $location.path("link_list");
        } else {
            alert("删除失败");
            $location.path("link_list");
        }
    });
});

food.controller("linkEditController", function ($scope,$http,$location,$stateParams,Upload) {
    $http({
        method: "get",
        url : "../Api/admin.php?action=link_list_one&link_id=" + $stateParams.link_id
    }).then(result => {
        console.log(result);
        $scope.link = result.data
    });

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.link.link_img) {
            // 图片名称     xxx.jpg
            console.log($scope.link.link_img);
            Upload.upload({
                url: "../Api/admin.php?action=link_edit",
                file: $scope.link.link_img
            }).success(function(result) {
                $scope.link.link_img = "uploads/" + result.link_img;
            });
        }
    };

    //提交表单
    $scope.link_edit = function() {
        $http({
            method: "POST",
            url:
                "../Api/admin.php?action=link_edit&link_id=" +
                $stateParams.link_id,
            data: $scope.link,
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
            if (result.data) {
                $location.path("link_list");
            } else {
                alert("添加失败");
                $location.path("link_list/" + $stateParams.link_id);
            }
        });
    };

});

food.controller("LinkAddController", function ($scope,$http,$location,Upload) {

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.link.link_img) {
            // 图片名称     xxx.jpg
            console.log($scope.link.link_img);
            Upload.upload({
                url: "../Api/admin.php?action=link_add",
                file: $scope.link.link_img
            }).success(function(result) {
                $scope.link.link_img = "uploads/" + result.link_img;
            });
        }
    };

    //提交表单
    $scope.link_edit = function() {
        $http({
            method: "POST",
            url:
                "../Api/admin.php?action=link_add",
            data: $scope.link,
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
            if (result.data) {
                $location.path("link_list");
            } else {
                alert("添加失败");
                $location.path("link_list/" + $stateParams.link_id);
            }
        });
    };

});