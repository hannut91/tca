(function(){
    'use strict';
    angular.module('myApp')
        .controller('customerlistCtrl', CustomerListController);
        
    CustomerListController.$inject = [
        '$scope',
        '$http'
    ];
    function CustomerListController($scope,$http){
        $http.get('/customerList')
            .success(function(data) {
                $scope.customerInfo = data;
                console.log($scope.customerInfo)
            }).
        error(function(data, status) {
            console.log("status : "+status)
        });
    };    
})();
