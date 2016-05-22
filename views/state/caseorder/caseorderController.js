(function(){
    'use strict';
    angular.module('myApp')
        .controller('caseorderCtrl', CaseOrderController);
        
    CaseOrderController.$inject = [
        '$scope',
        '$http',
        '$location'
    ];
    function CaseOrderController($scope, $http, $location){
        $scope.orderList = [];
        $scope.orderList.push({
            orderDevice: "",
            orderType: "",
            orderColor: "",
            orderAmout: ""
        });
        $scope.orderAppend = function() {
            $scope.orderList.push({
                orderDevice: $scope.orderList.orderDevice,
                orderType: $scope.orderList.orderType,
                orderColor: $scope.orderList.orderColor,
                orderAmount: $scope.orderList.orderAmount
            })
        };
        $scope.orderRemove = function() {
            $scope.orderList.pop();
        };
        
        //케이스 주문 DB에 저장하기
        $scope.orderSubmit = function() {
            var req = {
                method: 'POST',
                url: '/regOrder',
                data: {
                    orderDate: $scope.orderDate,
                    orderName: $scope.orderName,
                    orderTel: $scope.orderTel,
                    orderList: $scope.orderList,
                    orderAddr: $scope.orderAddr
                }
            };
            $http(req).success(function(data, status) {
                switch (status) {
                    case 202:
                        $location.path('/');
                        break;
                    case 404:
                        break;
                };
            });
        };
    };    
})();

