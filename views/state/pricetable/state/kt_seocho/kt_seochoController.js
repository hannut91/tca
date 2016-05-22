(function(){
    'use strict';
    angular.module('myApp')
        .controller('kt_seochoController', KT_SEOCHOController);
        
    KT_SEOCHOController.$inject = [
        '$scope',
        '$http'
    ];
    function KT_SEOCHOController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getkt_seocholist')
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