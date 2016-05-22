(function(){
    'use strict';
    angular.module('myApp')
    .controller('CustomerCreateController', CustomerCreateController);
        
    CustomerCreateController.$inject = [
        '$scope',
        '$http'
    ];
    function CustomerCreateController(
        $scope,
        $http
        ){
        console.log("hi");
    }
})();
