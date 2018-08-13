//主页面控制器
food.controller("MainController", function($scope, $http,$cookieStore,$rootScope,$location) {

    $rootScope.checkAdmin();

    //获取系统信息
    $http({
        method: "GET",
        url: "../Api/admin.php?action=system"
    }).then(function(result) {
        $scope.system = result.data;
    });
});

//系统配置控制器
food.controller("SystemController", function($scope, $http, $location, Upload) {
    //查询系统配置信息
    $http({
        method: "POST",
        url: "../Api/admin.php?action=system_edit"
    }).then(function(result) {
        $scope.conf = result.data;
    });

    //上传文件
    $scope.uploadImg = function() {
        if ($scope.conf.conf_img) {
            console.log($scope.conf.conf_img);
            Upload.upload({
                url: "../Api/admin.php?action=system_edit",
                file: $scope.conf.conf_img
            }).success(function(result) {
                $scope.conf.conf_img = "uploads/" + result.conf_img;
            });
        }
    };

    $scope.saveForm = function() {
        $http({
            method: "POST",
            url: "../Api/admin.php?action=system_edit",
            data: $scope.conf,
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
                location.reload();
            }
        });
    };
});

// system
food.controller("SystemInfoController", function($scope, $http) {
    //查询系统配置信息
    $http({
        method: "POST",
        url: "../Api/admin.php?action=system_edit"
    }).then(function(result) {
        $scope.conf = result.data;
    });
});


//公共控制器
food.controller('CommonCtrl',function($scope,$http,$rootScope,$location,$cookieStore){

    $rootScope.checkAdmin = function()
    {
        if($location.path() == "/login")
        {
            $("#header,#menu").css("display","none");
            $("#content").removeClass("content");
        }else{
            $("#header,#menu").css("display","block");
            $("#content").addClass("content");
        }

        if($location.path() != "/login")
        {
            if(!$cookieStore.get("admin_name"))
            {
                alert("请重新登录");
                $location.path('login');
            }else{
                $scope.admin_name = $cookieStore.get('admin_name');
            }
        }

    };

    $scope.logout = function()
    {
        $cookieStore.remove("admin_name");
        $location.path('login');
        return false;
    }

});

//登录控制器
food.controller('LoginController',function($scope,$http,$cookieStore,$location,$rootScope){

    $rootScope.checkAdmin();
    $scope.login = function()
    {
        $http({
            method:"post",
            url:"../Api/admin.php?action=login",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest:function(obj){
                var str = [];
                for(var s in obj)
                {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }

                return str.join("&");
            },
            data:$scope.admin
        }).then(function(result){
            if(result)
            {
                $cookieStore.put("admin_name",result.data.admin_name);
                $location.path('main');
                return false;

            }else{
                alert("登录失败，请重新登录");
                return false;
            }
        });
    }
});
