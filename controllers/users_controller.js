var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var Alert = mongoose.model('Alert');
var AlertEvent = mongoose.model('AlertEvent');
var OrderList = mongoose.model('OrderList');
var Promise = require('promise');
var fs = require('fs');
var formidable = require('formidable');
var savePrice = require('../parsing');

var SK_PS = mongoose.model('SK_PS');
var SK_ACE = mongoose.model('SK_ACE')

var KT_MIR = mongoose.model('KT_MIR');
var KT_COD = mongoose.model('KT_COD');
var KT_KWANGJIN = mongoose.model('KT_KWANGJIN');
var KT_SEOCHO = mongoose.model('KT_SEOCHO');

var LG_DREAM = mongoose.model('LG_DREAM');
var LG_SUNGBOOK = mongoose.model('LG_SUNGBOOK');
var LG_KWANGJIN = mongoose.model('LG_KWANGJIN');
var LG_SEOCHO = mongoose.model('LG_SEOCHO');

var TOTAL_PRICE = mongoose.model('TOTAL_PRICE');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).
        digest('base64').toString();
}
exports.signup = function (req, res) {
    var user = new User({ username: req.body.username });
    user.set('hashed_password', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.save(function (err) {
        if (err) {
            res.redirect('/signup');
        } else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.msg = 'Authenticated as ' + user.username;
            res.redirect('/');
        }
    });
};
exports.login = function (req, res) {
    User.findOne({ username: req.body.username })
        .exec(function (err, user) {
            if (!user) {
                err = 'User Not Found.';
            } else if (user.hashed_password ===
                hashPW(req.body.password.toString())) {
                    console.log("userrole :::"+user.role);
                req.session.regenerate(function () {
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.role = user.role;
                    res.redirect('/');
                });
            } else {
                err = 'Authentication failed.';
            }
            if (err) {
                req.session.regenerate(function () {
                    req.session.msg = err;
                    res.redirect('/login');
                });
            }
        });
};

exports.updateUser = function (req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function (err, user) {
            user.set('email', req.body.email);
            user.set('color', req.body.color);
            user.save(function (err) {
                if (err) {
                    res.sessor.error = err;
                } else {
                    req.session.msg = 'User Updated.';
                }
                res.redirect('/user');
            });
        });
};
exports.deleteUser = function (req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function (err, user) {
            if (user) {
                user.remove(function (err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function () {
                        res.redirect('/login');
                    });
                });
            } else {
                req.session.msg = "User Not Found!";
                req.session.destroy(function () {
                    res.redirect('/login');
                });
            }
        });
};
//자격 검사
exports.checkRole = function (req,res){
    if(req.session.role==1){
        res.json({msg:true});
    }
    else{
        res.json({msg:false});
    }
}
//고객 등록하기
exports.customerAdd = function (req, res) {
    var baseDate = new Date(new Date(req.body.customerDate).getTime()-32400000);
    var baseDate3,baseDate6,baseDate9,baseDate12,baseDate15,baseDate18,baseDate21,baseDate24;
    baseDate3 = new Date(baseDate.valueOf());
    baseDate3.setMonth(baseDate.getMonth()+3);
    baseDate3.setDate(1);
    baseDate6 = new Date(baseDate.valueOf());
    baseDate6.setMonth(baseDate.getMonth()+6);
    baseDate6.setDate(1);
    baseDate9 = new Date(baseDate.valueOf());
    baseDate9.setMonth(baseDate.getMonth()+9);
    baseDate9.setDate(1);
    baseDate12 = new Date(baseDate.valueOf());
    baseDate12.setMonth(baseDate.getMonth()+12);
    baseDate12.setDate(1);
    baseDate15 = new Date(baseDate.valueOf());
    baseDate15.setMonth(baseDate.getMonth()+15);
    baseDate15.setDate(1);
    baseDate18 = new Date(baseDate.valueOf());
    baseDate18.setMonth(baseDate.getMonth()+18);
    baseDate18.setDate(1);
    baseDate21 = new Date(baseDate.valueOf());
    baseDate21.setMonth(baseDate.getMonth()+21);
    baseDate21.setDate(1);
    baseDate24 = new Date(baseDate.valueOf());
    baseDate24.setFullYear(baseDate.getFullYear()+2);

    var alertEvent = [new Alert({
        content: "개통 후 7일이 지났습니다. 교품 마감일은 "+ 
         (new Date(baseDate.valueOf()+1123200000).getDay() == 6 ?
        new Date(baseDate.valueOf()+1209600000).getFullYear()+"년 "+
       ("0"+(new Date(baseDate.valueOf()+1209600000).getMonth()+1)).slice(-2)+"월 "+
       ("0"+(new Date(baseDate.valueOf()+1209600000).getDate()+1)).slice(-2)+"일"
       :
       new Date(baseDate.valueOf()+1123200000).getFullYear()+"년 "+
       ("0"+(new Date(baseDate.valueOf()+1123200000).getMonth()+1)).slice(-2)+"월 "+
       ("0"+(new Date(baseDate.valueOf()+1123200000).getDate()+1)).slice(-2)+"일")+" 입니다.",
        occurdate:new Date(baseDate.valueOf()+604800000),
        datecount:0
    }),new Alert({
      content:"개통 후 3달이 지났습니다.",
      occurdate : baseDate3,
      datecount:0
    }),new Alert({
      content:"개통 후 6달이 지났습니다.",
      occurdate : baseDate6,
      datecount:0
    }),new Alert({
      content:"개통 후 9달이 지났습니다.",
      occurdate : baseDate9,
      datecount:0
    }),new Alert({
      content:"개통 후 12달이 지났습니다.",
      occurdate : baseDate12,
      datecount:0
    }),new Alert({
      content:"개통 후 15달이 지났습니다.",
      occurdate : baseDate15,
      datecount:0
    }),new Alert({
      content:"개통 후 18달이 지났습니다.",
      occurdate : baseDate18,
      datecount:0
    }),new Alert({
      content:"개통 후 21달이 지났습니다.",
      occurdate : baseDate21,
      datecount:0
    }),new Alert({
      content:"개통 후 2년이 지났습니다.",
      occurdate : baseDate24,
      datecount:0
    })];
    var customer = new Customer({customername:req.body.customerName,
    phonenum:req.body.customerTel,
    newdate:req.body.customerDate,
    device:req.body.customerDevice,
    company:req.body.customerComp,
    account:req.body.account,
    userId:req.session.user});
    
    return new Promise(function(resolve){
        customer.save(function(err){
            if(err){
                console.log("err ::: "+err);
            }
            resolve(customer.id);
        });
    }).then(function(res){
        alertEvent.some(function(eachAlertEvent){
            eachAlertEvent.customerId = res;
            eachAlertEvent.save(function(err){
                if(err){
                    console.log("err ::: "+err);
                }
            })
        })
    }).then(function(){
        res.redirect('/');
    })
      
};

//고객목록 불러오기
exports.getUserList = function(req,res){
    Customer.find({userId:req.session.user})
    .exec(function(err,customerList){
        console.log(customerList);
        if(!customerList){
            res.json(404,{msg:'User Not Found'});
        }
        else{
            res.json(customerList);
        }
    })
}
/*
exports.getUserList = function(req,res){
    User.findOne({_id:req.session.user})
    .exec(function(err,user){
        if(!user){
            res.json(404,{msg: 'User Not Found.'});
        }
        else{
            res.json(user.customerlist);
        }
    });
};
*/
//알람목록 가져오기
exports.getAlertList = function(req,res){
    User.findOne({_id:req.session.user})
    .exec(function(err,user){
        if(!user){
            res.json(404,{err: 'User Not Found.'});
        }
        else{
            res.json(user.useralert);
        }
    })
};
//알람 삭제하기
exports.alertDelete = function(req,res){
    var indexNum = req.body.alertData;
    User.findOne({_id:req.session.user})
    .exec(function(err,user){
        if(!user){
            console.log("err : "+err);
        }
        else{
            user.useralert[indexNum].remove();
            user.save();
            res.json("{}");
        }
    })
};

//케이스 주문 DB에 저장하기
exports.regOrder = function(req,res){
    var orderList = req.body.orderList;
    var newOrder = new OrderList({orderId:req.session.user});

    newOrder.set('orderDate',req.body.orderDate);
    newOrder.set('orderName',req.body.orderName );
    newOrder.set('orderTel',req.body.orderTel);
    
    orderList.forEach(function(eachOrder){
        newOrder.orderModel.push(eachOrder.orderModel);
        newOrder.orderType.push(eachOrder.orderType);
        newOrder.orderColor.push(eachOrder.orderColor);
        newOrder.orderNum.push(eachOrder.orderNum);
    });
    newOrder.set('orderAddr',req.body.orderAddr);
    
    newOrder.save(function(err){
        if(err){
            res.status(404).json({err:'User not found'})
        }
        else{
            res.status(202).json({msg:'DB insert success'});
        }
    });             
}

//주문현황 가져오기
exports.getOrderList = function(req,res){
    OrderList.find({orderId:req.session.user})
    .exec(function(err,orderlist){
        if(err){
            res.status(404).json({err: 'User Not Found.'});
        }
        else{
            res.status(202).json(orderlist);
        }
    });
};
//주문완료 버튼 클릭하면 실행됨
exports.orderFin = function(req, res){
    OrderList.findOne({_id:req.body.objectData})
    .exec(function(err,orderlist){
        if(err){
            res.status(404).json({err:'List Not Found.'});
        }
        else{
            orderlist.set('orderFinDate',new Date());
            orderlist.save(function(err){
                if(err){
                    res.status(404).json({err:'DB Save Failed'});
                }
                else{
                    res.status(202).json(orderlist.orderFinDate);
                }
            });
        }
    });
};
//안내완료 버튼 클릭하면 실행됨
exports.notiFin = function(req, res){
    OrderList.findOne({_id:req.body.objectData})
    .exec(function(err,orderlist){
        if(err){
            res.status(404).json({err:'List Not Found.'});
        }
        else{
            orderlist.set('notiFinDate',new Date());
            orderlist.save(function(err){
                if(err){
                    res.status(404).json({err:'DB Save Failed'});
                }
                else{
                    res.status(202).json(orderlist.notiFinDate);
                }
            });
        }
    });
};
//전달완료 버튼 클릭하면 실행됨
exports.pickFin = function(req, res){
    OrderList.findOne({_id:req.body.objectData})
    .exec(function(err,orderlist){
        if(err){
            res.status(404).json({err:'List Not Found.'});
        }
        else{
            orderlist.remove();
            orderlist.save(function(err){
                if(err){
                    console.log("db remove fail")
                    res.status(404).json({err:'DB Remove Failed'});
                }
                else{
                    res.status(202).json({msg:'DB Remove Success'});
                }
            })
        }
    })
};
exports.uploadFile = function(req, res){

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "files/price";
    form.keepExtensions = true; 
    
    form.parse(req, function(err, fields, files) {
        fs.rename(files.uploadFile.path, form.uploadDir + "/" + fields.accountName+".xlsx",function(){
            savePrice.savePrice(function(){
                res.redirect('back');
            });
        });
    });
    return; 
};

//SK_PS 단가표 목록 가져오기
exports.getSK_PSList = function(req, res){
    SK_PS.find({}).sort({model:1}).exec(function(err,docs){
        if(err){
            res.json({msg:err});
        }
        else{
            res.json(docs)
        }
    })
}
//SK_ACE 단가표 목록 가져오기
exports.getSK_ACEList = function(req, res){
    var data = SK_ACE.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//KT_MIR 단가표 목록 가져오기
exports.getKT_MIRList = function(req, res){
    var data = KT_MIR.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//KT_COD 단가표 목록 가져오기
exports.getKT_CODList = function(req, res){
    var data = KT_COD.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//KT_KWANGJIN 단가표 목록 가져오기
exports.getKT_KWANGJINList = function(req, res){
    var data = KT_KWANGJIN.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}

//KT_SEOCHO 단가표 목록 가져오기
exports.getKT_SEOCHOList = function(req, res){
    var data = KT_SEOCHO.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//LG_DREAM 단가표 목록 가져오기
exports.getLG_DREAMList = function(req, res){
    var data = LG_DREAM.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//LG_SUNGBOOK 단가표 목록 가져오기
exports.getLG_SUNGBOOKList = function(req, res){
    var data = LG_SUNGBOOK.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//LG_KWANGJIN 단가표 목록 가져오기
exports.getLG_KWANGJINList = function(req, res){
    var data = LG_KWANGJIN.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//LG_SEOCHO 단가표 목록 가져오기
exports.getLG_SEOCHOList = function(req, res){
    var data = LG_SEOCHO.find({}).sort({model:1}).exec(function(err, doc){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json(doc)
        }
    });
}
//전체 단가표 목록 가져오기
exports.getTotalPriceList = function(req, res){
    TOTAL_PRICE.find({}).sort({model:1}).exec(function(err,doc){
        if(err){
            res.json({msg:err});
        }
        else{
            res.json(doc);
        }
    });
}

