food.controller("ArticleListController", function(
    $scope,
    $http,
    page,
    $rootScope
) {
    $http({
        method: "get",
        url: "../Api/admin.php?action=article_count"
    }).then(result => {
        // console.log(result);
        $scope.totalItems = result.data.c;
    });

    $scope.currentPage = 1;
    $scope.bigTotalItems = 10;
    $scope.maxSize = 5;

    var url = "../Api/admin.php?action=article_list";

    page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(function(
        result
    ) {
        // console.log(result);
        // 返回的是一个数组
        $scope.article_list = result;
    });

    $scope.pageChanged = function() {
        page.getData(url, $scope.currentPage, $scope.bigTotalItems).then(
            function(result) {
                $scope.article_list = result;
            }
        );
    };

    // 点击删除文章时拿到对应的id
    $scope.deleteArt = function(art_id) {
        $rootScope.art_id = art_id;
    };

});

//删除文章
food.controller("ArticleDeleteController",function($scope,$http,$stateParams,$location){

    $http({
        url:"../Api/admin.php?action=article_delete&art_id="+$stateParams.art_id,
        method:"get"
    }).then(function(result){
        if(result.data)
        {
            $location.path('article_list');
        }else{
            alert('删除失败');
            $location.path('article_list');
        }
    });
});


// 文章添加
food.controller("ArticleAddController", function(
    $scope,
    $http,
    $location,
    Upload
) {
    console.log(art);
    // 获取文章分类
    $http({
        method: "get",
        url: "../Api/admin.php?action=article_cate"
    }).then(result => {
        console.log(result);
        $scope.cate_list = result.data;
    });

    //上传文件
    $scope.uploadImg = function() {

        if ($scope.art.art_img) {
            // console.log($scope.art.art_img);
            Upload.upload({
                url: "../Api/admin.php?action=article_add",
                file:$scope.art.art_img
            }).success(function(result) {
                // console.log(result.art_img);
                // php 返回处理 图片组装好的地址  
                $scope.art.art_img = "uploads/" + result.art_img;
            });
        }
    };

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=article_add",
            data: $scope.art,
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
                $location.path("article_list");
            } else {
                alert("添加失败");
                $location.path("article_add");
            }
        });
    };
});


//文章分类
food.controller("ArticleCateController",function ($scope,$http,$rootScope) {

    $http({
        method : "get",
        url : "../Api/admin.php?action=article_cate"
    }).then(result => {
        $scope.cate_list = result.data;
    });

    $scope.CateDelete = function (artcate_id) {
        console.log(artcate_id);
        $rootScope.artcate_id = artcate_id;
    }

});


// 添加文章分类
food.controller("ArticleCateAddController",function ($scope,$http,$location) {

    //提交表单
    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=article_cate_add",
            data: $scope.cate,
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
            console.log(result.data);
            if (result.data) {
                $location.path("article_cate");
            } else {
                alert("添加失败");
                $location.path("food_cate_add");
            }
        });
    };


});


// 删除文章分类
food.controller("ArticleCateDeleteController", function ($http,$scope,$location,$stateParams) {

    console.log($stateParams.artcate_id);
    $http({
        method : "get",
        url : "../Api/admin.php?action=article_cate_delete&artcate_id=" + $stateParams.artcate_id
    }).then(result => {
        // console.log(result.data[0]);
        if (result.data[0]) {
            $location.path("article_cate");
        } else {
            alert("删除失败");
            $location.path("article_cate");
        }
    });

    

});