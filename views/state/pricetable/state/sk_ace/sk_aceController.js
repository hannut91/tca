(function(){
    'use strict';
    angular.module('myApp')
        .controller('sk_aceController', SK_ACEController);
        
    SK_ACEController.$inject = [
        '$scope',
        '$http'
    ];
    function SK_ACEController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getsk_acelist')
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