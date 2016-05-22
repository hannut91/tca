(function(){
    'use strict';
    angular.module('myApp')
        .controller('lg_sungbookController', LG_SUNGBOOKController);
        
    LG_SUNGBOOKController.$inject = [
        '$scope',
        '$http'
    ];
    function LG_SUNGBOOKController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getlg_sungbooklist')
                .success(function(data, status, headers, config) {
                    $scope.pricelist = data;
                    $scope.error = "";
                })
                .error(function(data, status, headers, config) {
                    $scope.pricelist = {};
                    $scope.error = data;
                });
    }
})();