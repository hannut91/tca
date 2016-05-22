(function(){
    'use strict';
    angular.module('myApp')
        .controller('kt_mirController', KT_MIRController);
        
    KT_MIRController.$inject = [
        '$scope',
        '$http'
    ];
    function KT_MIRController($scope,$http){
        
        //단가표 목록 가져오기
        $http.get('/getkt_mirlist')
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