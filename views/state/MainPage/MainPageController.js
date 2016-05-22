(function(){
    'use strict';
    angular.module('myApp')
    .controller('MainPageController', MainPageController);
        
    MainPageController.$inject = [
        '$scope','$http','$state'
    ];
    function MainPageController(
        $scope, $http, $state
        ){
            $scope.goToFindPrice = goToFindPrice;
            
            function goToFindPrice(){
                $http.get('/checkRole')
                    .success(function(data,status,headers,config){
                        console.log(data);
                       if(data.msg==true){
                           $state.go('findPrice');
                       }
                       else{
                           alert("자격이 없습니다.");
                       }
                    })
                    .error(function(data,status,headers,config){
                        
                    })
            }    
            
        //알람목록 가져오기
        $http.get('/arlam/find')
                .success(function(data, status, headers, config) {
                    $scope.ale = data;
                    $scope.error = "";
                })
                .error(function(data, status, headers, config) {
                    $scope.ale = {};
                    $scope.error = data;
                });
        //알람 삭제하기
        $scope.alertComplete = function(alertId) {
            var req = {
                method: 'POST',
                url: '/arlam/delete',
                data: {
                    alertData: alertId
                }
            };
            $http(req).success(function() {
                $scope.ale.splice(alertId, 1);
            });
        };
    }
})();
