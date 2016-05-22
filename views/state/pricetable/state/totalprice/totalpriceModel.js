(function() {
  'use strict';

  angular.module('myApp')
    .factory('TotalpriceModel', TotalpriceModel);

  TotalpriceModel.$inject = [];

  function TotalpriceModel() {

    var Model = {
        companyList:[
            'SK PS',
            'SK 에이스',
            'KT 미르',
            'KT COD',
            'KT 광진',
            'KT 서초',
            'LG 드림',
            'LG 성북',
            'LG 광진',
            'LG 서초'
        ],
        priceSort:[
            '공시지원금 63이상',
            '공시지원금 53이상',
            '공시지원금 43이상',
            '공시지원금 33이상',
            '공시지원금 23이상',
            '선택약정 63이상',
            '선택약정 53이상',
            '선택약정 43이상',
            '선택약정 33이상',
            '선택약정 23이상',
        ],
        signList:[
            '010',
            'mnp',
            'chn'
        ]
    };
    return Model;
  }
})();