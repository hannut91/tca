(function(){
    'use strict';
    angular.module('myApp')
        .controller('sk_psController', SK_PSController);
        
    SK_PSController.$inject = [
        '$scope',
        '$http'
    ];
    function SK_PSController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getsk_pslist')
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