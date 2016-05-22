(function(){
    'use strict';
    angular.module('myApp')
        .controller('kt_kwangjinController', KT_KWANGJINController);
        
    KT_KWANGJINController.$inject = [
        '$scope',
        '$http'
    ];
    function KT_KWANGJINController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getkt_kwangjinlist')
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