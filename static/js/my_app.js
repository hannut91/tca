(function(){
    'use strict';

angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/MainPage");
        $stateProvider
            .state('MainPage', {
                url: "/MainPage",
                templateUrl: "/views/state/MainPage/MainPage.html",
                controller: 'MainPageController'
            })
            .state('CustomerCreate', {
                url: "/CustomerCreate",
                templateUrl: "/views/state/CustomerCreate/CustomerCreate.html",
                controller: 'CustomerCreateController'
            })
            .state('main', {
                url: "/main",
                templateUrl: "/views/state/main/main.html"
            })
            .state('customerList', {
                url: "/customerlist",
                templateUrl: "/views/state/customerlist/customerlist.html"
            })
            .state('quickCall', {
                url: "/quickcall",
                templateUrl: "/views/state/quickcall/quickcall.html"
            })
            .state('quickConfirm', {
                url: "/quickconfirm",
                templateUrl: "/views/state/quickconfirm/quickconfirm.html"
            })
            .state('usimCall', {
                url: "/usimcall",
                templateUrl: "/views/state/usimcall/usimcall.html"
            })
            .state('caseOrder', {
                url: "/caseorder",
                templateUrl: "/views/state/caseorder/caseorder.html",
                controller: 'caseorderCtrl'
            })
            .state('orderList', {
                url: "/orderlist",
                templateUrl: "/views/state/orderlist/orderlist.html",
                controller: "orderListCtrl"
            })
            .state('findDevice', {
                url: "/finddevice",
                templateUrl: "/views/state/finddevice/finddevice.html",
            })
            .state('findPrice', {
                url: "/findprice",
                templateUrl: "/views/state/findprice/findprice.html",
            })
            .state('priceTable',{
                url: "/pricetable",
                templateUrl: "/views/state/pricetable/pricetable.html",
            })
    })
})();