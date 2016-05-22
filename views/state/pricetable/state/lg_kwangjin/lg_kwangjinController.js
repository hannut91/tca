(function(){
    'use strict';
    angular.module('myApp')
        .controller('lg_kwangjinController', LG_KWANGJINController);
        
    LG_KWANGJINController.$inject = [
        '$scope',
        '$http'
    ];
    function LG_KWANGJINController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getlg_kwangjinlist')
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