(function(){
    'use strict';
    angular.module('myApp')
        .controller('PriceTableController', PriceTableController);
        
    PriceTableController.$inject = [
        '$scope',
        '$http',
        'PriceTableModel'
        
    ];
    function PriceTableController($scope,$http,PriceTableModel){
        var vm = this;
        vm.Model = PriceTableModel;
        vm.findMax = findMax;
        function findMax(list){
            var Max = [0,0,0,0,0,0,0,0,0,0];
            list.ofc_63.some(function(eachOfc63){
                if(eachOfc63 > Max[0]){
                    Max[0] = eachOfc63;
                }
            });
            list.ofc_53.some(function(eachOfc53){
                if(eachOfc53 > Max[1]){
                    Max[1] = eachOfc53;
                }
            });
            list.ofc_43.some(function(eachOfc43){
                if(eachOfc43 > Max[2]){
                    Max[2] = eachOfc43;
                }
            });
            list.ofc_33.some(function(eachOfc33){
                if(eachOfc33 > Max[3]){
                    Max[3] = eachOfc33;
                }
            });
            list.ofc_23.some(function(eachOfc23){
                if(eachOfc23 > Max[4]){
                    Max[4] = eachOfc23;
                }
            });
            list.cho_63.some(function(eachOfc63){
                if(eachOfc63 > Max[5]){
                    Max[5] = eachOfc63;
                }
            });
            list.cho_53.some(function(eachOfc53){
                if(eachOfc53 > Max[6]){
                    Max[6] = eachOfc53;
                }
            });
            list.cho_43.some(function(eachOfc43){
                if(eachOfc43 > Max[7]){
                    Max[7] = eachOfc43;
                }
            });
            list.cho_33.some(function(eachOfc33){
                if(eachOfc33 > Max[8]){
                    Max[8] = eachOfc33;
                }
            });
            list.cho_23.some(function(eachOfc23){
                if(eachOfc23 > Max[9]){
                    Max[9] = eachOfc23;
                }
            });
            return Max;
            
        }

        $http.get('/gettotalprice')
                .success(function(data, status, headers, config) {
                    vm.pricelist = data;
                    vm.error = "";
                })
                .error(function(data, status, headers, config) {
                    vm.pricelist = {};
                    vm.error = data;
                });
    }
})();

// (function(){
//     'use strict';
//     angular.module('myApp')
//         .controller('priceTableController', PriceTableController)
//         .config(PriceTableStateProvider);
        
//     PriceTableController.$inject = [
//         '$scope',
//         '$http'
//     ];
//     function PriceTableController($scope,$http){
//     };
//     PriceTableStateProvider.$inject =[
//         '$stateProvider',
//         '$urlRouterProvider'
//     ];
//     function PriceTableStateProvider($stateProvider,$urlRouterProvider){
//         //$urlRouterProvider.otherwise("/totalprice");
//         $stateProvider
//             .state('priceTable.totalprice', {
//                     url: "/totalprice",
//                     templateUrl: "/views/state/pricetable/state/totalprice/totalprice.html",
//             })
//             .state('priceTable.sk_ps', {
//                     url: "/sk_ps",
//                     templateUrl: "/views/state/pricetable/state/sk_ps/sk_ps.html",
//             })
//             .state('priceTable.sk_ace', {
//                 url: "/sk_ace",
//                 templateUrl: "/views/state/pricetable/state/sk_ace/sk_ace.html",
//             })
//             .state('priceTable.kt_mir', {
//                 url: "/kt_mir",
//                 templateUrl: "/views/state/pricetable/state/kt_mir/kt_mir.html",
//             })
//             .state('priceTable.kt_cod', {
//                 url: "/kt_cod",
//                 templateUrl: "/views/state/pricetable/state/kt_cod/kt_cod.html",
//             })
//             .state('priceTable.kt_kwangjin', {
//                 url: "/kt_kwangjin",
//                 templateUrl: "/views/state/pricetable/state/kt_kwangjin/kt_kwangjin.html",
//             })
//             .state('priceTable.kt_seocho', {
//                 url: "/kt_seocho",
//                 templateUrl: "/views/state/pricetable/state/kt_seocho/kt_seocho.html",
//             })
//             .state('priceTable.lg_dream', {
//                 url: "/lg_dream",
//                 templateUrl: "/views/state/pricetable/state/lg_dream/lg_dream.html",
//             })
//             .state('priceTable.lg_sungbook', {
//                 url: "/lg_sungbook",
//                 templateUrl: "/views/state/pricetable/state/lg_sungbook/lg_sungbook.html",
//             })
//             .state('priceTable.lg_kwangjin', {
//                 url: "/lg_kwangjin",
//                 templateUrl: "/views/state/pricetable/state/lg_kwangjin/lg_kwangjin.html",
//             })
//     } 
// })();
