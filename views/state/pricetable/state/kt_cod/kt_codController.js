(function(){
    'use strict';
    angular.module('myApp')
        .controller('kt_codController', KT_CODController);
        
    KT_CODController.$inject = [
        '$scope',
        '$http'
    ];
    function KT_CODController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getkt_codlist')
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