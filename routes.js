var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var users = require('./controllers/users_controller');

  app.use('/static', express.static( './static')).
      use('/lib', express.static( '../lib')
  );
  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index/index', {username: req.session.username,
                           msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup/signup', {msg:req.session.msg});
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login/login', {msg:req.session.msg});
  });
  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  app.post('/signup', users.signup);
  app.post('/login', users.login);
  
  //자격 검사
  app.get('/checkRole',users.checkRole);
  
  //고객 등록하기
  app.post('/customerreg/add',users.customerAdd);
  
  //고객목록 불러오기
  app.get('/customerList',users.getUserList);

  //알람
  app.get('/arlam/find',users.getAlertList);    //목록 가져오기  
  app.post('/arlam/delete',users.alertDelete);  //목록 삭제
  
  //케이스 주문 DB에 저장하기
  app.post('/regOrder',users.regOrder);
  
  //주문현황 가져오기
  app.post('/getOrderList',users.getOrderList);

  //주문완료 버튼 클릭하면 실행됨
  app.post('/orderFin', users.orderFin);
  
  //안내완료 버튼 클릭하면 실행됨
  app.post('/notiFin', users.notiFin);
  
  //전달완료 버튼 클릭하면 실행됨
  app.post('/pickFin', users.pickFin);

  app.post('/fileUpload',users.uploadFile);
  
  //SK_PS 단가표 목록 가져오기
  app.get('/getsk_pslist',users.getSK_PSList);
  
  //SK_ACE 단가표 목록 가져오기
  app.get('/getsk_acelist',users.getSK_ACEList);
  
  //KT_MIR 단가표 목록 가져오기
  app.get('/getkt_mirlist',users.getKT_MIRList);
  
  //KT_COD 단가표 목록 가져오기
  app.get('/getkt_codlist',users.getKT_CODList);
  
  //KT_KWANGJIN 단가표 목록 가져오기
  app.get('/getkt_kwangjinlist',users.getKT_KWANGJINList);
  
  //KT_SEOCHO 단가표 목록 가져오기
  app.get('/getkt_seocholist',users.getKT_SEOCHOList);
  
  //LG_DREAM 단가표 목록 가져오기
  app.get('/getlg_dreamlist',users.getLG_DREAMList);
  
  //LG_SUNGBOOK 단가표 목록 가져오기
  app.get('/getlg_sungbooklist',users.getLG_SUNGBOOKList);
  
  //LG_KWANGJIN 단가표 목록 가져오기
  app.get('/getlg_kwangjinlist',users.getLG_KWANGJINList);
  
  //LG_SEOCHO 단가표 목록 가져오기
  app.get('/getlg_seocholist',users.getLG_SEOCHOList);
  
  //전체 단가표 목록 가져오기
  app.get('/gettotalprice',users.getTotalPriceList);
}