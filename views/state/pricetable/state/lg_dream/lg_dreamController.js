(function(){
    'use strict';
    angular.module('myApp')
        .controller('lg_dreamController', LG_DREAMController);
        
    LG_DREAMController.$inject = [
        '$scope',
        '$http'
    ];
    function LG_DREAMController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getlg_dreamlist')
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