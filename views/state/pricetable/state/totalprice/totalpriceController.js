(function(){
    'use strict';
    angular.module('myApp')
        .controller('totalpriceController', TotalPriceController);
        
    TotalPriceController.$inject = [
        '$scope',
        '$http',
        'TotalpriceModel'
    ];
    function TotalPriceController($scope,$http,TotalpriceModel){
        var vm = this;
        vm.Model = TotalpriceModel;
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