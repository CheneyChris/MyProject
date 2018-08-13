food.factory('page',function($http,$q){

    function getData($url,$current,$limit)
    {
        //创建promise对象
        var deferred=$q.defer();
        var promise=deferred.promise;

        //封装post的数据结构
        var data = {
            current:$current,
            limit:$limit
        };

        //请求的url地址
        var url = $url;

        //post请求头信息
        var postCfg = {
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest:function(data){
                return $.param(data);
            }
        };

        $http.post(url,data,postCfg).success(function(response){
            deferred.resolve(response);//执行成功
        });

        return promise;
    }

    return {
        getData:getData
    }
});