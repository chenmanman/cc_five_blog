define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('postcontrol', ['$routeParams','$scope','$http','$window','$rootScope',function ($routeParams,$scope,$http,$window,$rootScope) {
        var ccode=$routeParams.catecode;

        console.log("good day");
        ccode= ccode.replace(':','');

        $http.get('/postlist_cate'+ccode).success(function (data) {

            $rootScope.blogLists=data;//注意的是作用域的问题。

        });

        $scope.post_reading_cli= function (postid) {

            $window.location.href="/#/npostreading:"+postid;

        };

    }]);

    controllers.controller('postreadcontrol', ['$routeParams','$scope','$http','$window','$rootScope',function ($routeParams,$scope,$http,$window,$rootScope) {

        var postid=$routeParams.postid;

        postid= postid.replace(':','');

        $scope.post_read_info = {//显示出来的文章内容

            post_reading_info_title:'',
            post_reading_next_title:'',
            post_reading_next_id:'',
            post_reading_cate_code:'',
            post_reading_cate_name:'',

        };

        $http.get('/postcontentbyid'+postid).success(function (data) {

                $http.get('/postlist_cate'+data.catecode).success(function (data_su) {

                    for(var k=0;k<data_su.length;k++){

                        if(data_su[k]._id==postid){

                            if(k==data_su.length-1){

                                $scope.post_read_info.post_reading_next_id=data_su[0]._id;

                                $scope.post_read_info.post_reading_next_title=data_su[0].title;

                            }else
                            {
                                $scope.post_read_info.post_reading_next_id=data_su[k+1]._id;

                                $scope.post_read_info.post_reading_next_title=data_su[k+1].title;
                            }
                        }
                    }

                });

            console.log("zhelisa");

                //获取catelist
            $http.get('/postcategoryInfoList').success(function (catelist) {

                console.log(catelist);

                for(var m=0;m<catelist.length;m++){

                    if(catelist[m].blogCategory_code==data.catecode){

                        $scope.post_read_info.post_reading_cate_name=catelist[m].blogCategory_name;
                        $scope.post_read_info.post_reading_cate_code=catelist[m].blogCategory_code;

                    }

                }


            });




                $scope.post_read_info.post_reading_info_title=data.title;

                var template = document.getElementById("post_content_modal");
                if(template) {
                    $(template).html(data.blogcontent);
                }
         });


        $scope.post_reading_cli= function (postid) {

            //这边做一个文章阅读数量的统计

            $window.location.href="/#/npostreading:"+postid;

        };

        //<li><a href="#/post:2001">阅读积累01</a></li>
        $scope.back_to_postlist_cli= function (catecode) {

            console.log(catecode);
            //这边做一个文章阅读数量的统计

            $window.location.href="/#/post:"+catecode;

        };


    }]);

    controllers.controller('homepagecontrol', ['$scope','$http','$window',function ($scope,$http,$window) {


            //这边获取最新的一个homepagemodel

        $http.get('/homepagefirst').success(function (data) {


            $scope.hpf={
                img_one:data[0].img_one,
                img_two:data[0].img_two,
                img_three:data[0].img_three,
                note_one:data[0].note_one,
                note_two:data[0].note_two,
                note_three:data[0].note_three,
                note_four:data[0].note_four,
                note_five:data[0].note_five,
                quote_content:data[0].quote_content
            };
            $('#carousel-example-generic').carousel();//好low的一种写法。

        });


    }]);

    controllers.controller('aboutcontrol', ['$scope','$http','$window',function ($scope,$http,$window) {

    }]);

    controllers.controller('backendcontrol', ['BaseModule','$scope','$http','$window',function (BaseModule,$scope,$http,$window) {


        $scope.bacend_aparameter = {//显示出来的文章内容
            winHeight:document.documentElement.clientHeight+"px",
            cate_add_show:'true',
            cate_list_show:'none'
        };

        /*----以下时blogcate-----*/

        $scope.blogcate_add_cli=function(){

            $scope.bacend_aparameter.cate_add_show='true';
            $scope.bacend_aparameter.cate_list_show='none';

        };

        $scope.blogcate_list_cli=function(){
            $scope.bacend_aparameter.cate_add_show='none';
            $scope.bacend_aparameter.cate_list_show='true';

            //请求list数据
            $http.get('/postcategoryInfoList').success(function (data) {

                if (data.err) {
                    return $scope.err = data.err;
                }
                $scope.categoryInfoLists=data;
                console.log($scope.categoryInfoLists);

            });

        };

        $scope.postcate = {
            blogCategory_name:'',
            blogCategory_code:'',
            blogCategory_desc:''
        };

        $scope.blogcate_sub_cli=function(){

            if($scope.postcate.blogCategory_name==''||$scope.postcate.blogCategory_code==''){
                alert("空判");return;
            }
            //save
            $http.post('/postCategorySave', $scope.postcate).success(function (data) {

                location.reload();

            });

        };

        $scope.blogCategory_update=function(categoryid,categoryname_new){

            if(categoryname_new==undefined){
                alert("名称不能为空！");
            }else{
                var paramestr=categoryid+"&"+categoryname_new;

                $http.get('/postcategoryupdate'+paramestr).success(function (data) {

                    $http.get('/postcategoryInfoList').success(function (data) {
                        $scope.categoryInfoLists=data;
                    });
                });

            }
        };

        $scope.blogCategory_del=function(Param){
            $http.get('/postcategorydel'+Param).success(function (data) {
                $http.get('/postcategoryInfoList').success(function (data) {
                    $scope.categoryInfoLists=data;
                });
            });

        };

        /*----以下是post-----*/

        $scope.postform = {
            title:'',//标题
            author:'',//作者
            blogcontent:'',//文章内容
            catecode:''//分类编码

        };

        $scope.post_add_cli=function(){

            if( $scope.postform.title=="" || $scope.postform.author=="" || $scope.postform.blogcontent=="" || $scope.postform.catecode==""){

                alert("空判");return;
            }else{

                $http.post('/postadd', $scope.postform).success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                    location.reload();
                });

            }

        };

        $http.get('/postlist').success(function (data) {

            $scope.blogLists=data;
            console.log(data);

        });

        $scope.post_del=function(blog_id){//通过文章的id去做删除

            $http.get('/postdel'+blog_id).success(function (data) {

                $http.get('/postlist').success(function (data) {
                    $scope.blogLists=data;

                });
            });

        };


        /*----以下是首页的内容设置-----*/

        $scope.homepageform = {
            note_one:'',
            note_two:'',
            note_three:'',
            note_four:'',
            note_five:'',
            quote_content:'',
            img_one:'',
            img_two:'',
            img_three:''
        };

        $scope.homepagemodel_add_cli=function(){

            if( $scope.homepageform.note_one=="" || $scope.homepageform.note_two=="" ||
                $scope.homepageform.note_three=="" || $scope.homepageform.note_four==""||
                $scope.homepageform.note_five=="" || $scope.homepageform.quote_content=="" ||
                $scope.homepageform.img_one=="" || $scope.homepageform.img_two==""||
                $scope.homepageform.img_three==""){

                alert("空判");return;
            }else{

                $http.post('/homepageadd', $scope.homepageform).success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                    location.reload();
                });

            }

        };

        $http.get('/homepagelist').success(function (data) {

            $scope.homepages=data;

        });

        $scope.homepage_del=function(qu_id){//通过文章的id去做删除

            $http.get('/homepagedel'+qu_id).success(function (data) {

                $http.get('/homepagelist').success(function (data) {
                    $scope.homepages=data;

                });
            });

        };

        $http.get('/homepagefirst').success(function (data) {

            $scope.homepageform={
                img_one:data[0].img_one,
                img_two:data[0].img_two,
                img_three:data[0].img_three,
                note_one:data[0].note_one,
                note_two:data[0].note_two,
                note_three:data[0].note_three,
                note_four:data[0].note_four,
                note_five:data[0].note_five,
                quote_content:data[0].quote_content
            };


        });




    }]);

    controllers.controller('backendinitcontrol', ['BaseModule','$scope','$http','$window',function (BaseModule,$scope,$http,$window) {

        console.log("init");

    }]);



});
