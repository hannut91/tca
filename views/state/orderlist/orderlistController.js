(function(){
    'use strict';
    angular.module('myApp')
        .controller('orderListCtrl', OrderListController);
        
    OrderListController.$inject = [
        '$scope',
        '$http'
    ];
    function OrderListController($scope, $http){
        var req = {
            method: 'POST',
            url: '/getOrderList'
        };
        $http(req).success(function(data, status) {
            switch (status) {
                case 202:
                    $scope.orderList = data;
                    break;
                case 404:
                    break;
                default:
                    break;
            }
        });
        //주문완료 버튼 클릭하면 실행됨
        $scope.orderFin = function(objectId, index) {
            var temp = {
                method: 'POST',
                url: '/orderFin',
                data: {
                    objectData: objectId
                }
            }
            $http(temp).success(function(data, status) {
                switch (status) {
                    case 202:
                        $scope.orderList[index].orderFinDate = data;
                        break;
                    case 404:
                        break;
                    default:
                        break;
                }
            });
        };
        //안내완료 버튼 클릭하면 실행됨
        $scope.notiFin = function(objectId, index) {
            var temp = {
                method: 'POST',
                url: '/notiFin',
                data: {
                    objectData: objectId
                }
            }
            $http(temp).success(function(data, status) {
                switch (status) {
                    case 202:
                        $scope.orderList[index].notiFinDate = data;
                        break;
                    case 404:
                        break;
                    default:
                        break;
                }
            });
        };
        //전달완료 버튼 클릭하면 실행됨
        $scope.pickFin = function(objectId, index) {
            var temp = {
                method: 'POST',
                url: '/pickFin',
                data: {
                    objectData: objectId
                }
            }
            $http(temp).success(function(data, status) {
                switch (status) {
                    case 202:
                        $scope.orderList.splice(index, 1);
                        break;
                    case 404:
                        console.log("angular fail");
                        break;
                    default:
                        break;
                }
            });
        };
    };    
})();
