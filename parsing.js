var excel = require('node-xlsx');
var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('promise');
var SK_PS = mongoose.model('SK_PS');
var SK_ACE = mongoose.model('SK_ACE');

var KT_MIR = mongoose.model('KT_MIR');
var KT_COD = mongoose.model('KT_COD');
var KT_KWANGJIN = mongoose.model('KT_KWANGJIN');
var KT_SEOCHO = mongoose.model('KT_SEOCHO');

var LG_DREAM = mongoose.model('LG_DREAM');
var LG_SUNGBOOK = mongoose.model('LG_SUNGBOOK');
var LG_KWANGJIN = mongoose.model('LG_KWANGJIN');
var LG_SEOCHO = mongoose.model('LG_SEOCHO');

var TOTAL_PRICE = mongoose.model('TOTAL_PRICE');

var SK_PS_PATH = 'files/price/sk_ps.xlsx';
var SK_ACE_PATH = 'files/price/sk_ace.xlsx';

var KT_MIR_PATH = 'files/price/kt_mir.xlsx';
var KT_COD_PATH = 'files/price/kt_cod.xlsx';
var KT_KWANGJIN_PATH = 'files/price/kt_kwangjin.xlsx';
var KT_SEOCHO_PATH = 'files/price/kt_seocho.xlsx';

var LG_KWANGJIN_PATH = 'files/price/lg_kwangjin.xlsx';
var LG_DREAM_PATH = 'files/price/lg_dream.xlsx';
var LG_SUNGBOOK_PATH = 'files/price/lg_sungbook.xlsx';
var LG_SEOCHO_PATH = 'files/price/lg_seocho.xlsx';
var device_list = {
    "AM-H200":"H200",
    "TG-L800S":"L800",
    "SM-G930S_32G":"G930_32G",
    "SM-G930S_64GG":"G930_64G",
    "SM-G935S_32G":"G935_32G",
    "SM-G935S_64GG":"G935_64G",
    "LG-F700S":"F700",
    "SM-N920S_32G":"N920_32G",
    "SM-N920S_64G":"N920_64G",
    "SM-N920S_128G":"N920_128G",
    "SM-G928S_32G":"G928_32G",
    "SM-G920S_32G":"G920_32G",
    "SM-G920S_64G":"G920_64G",
    "SM-G925S_32G":"G925_32G",
    "SM-G925S_64G":"G925_64G",
    "SM-G925S_128G":"G925_128G",
    "IPHONE6_16G":"IPHONE6_16G",
    "IPHONE6_64G":"IPHONE6_64G",
    "IPHONE6_128G":"IPHONE6_128G",
    "IPHONE6+_16G":"IPHONE6+_16G",
    "IPHONE6+_64G":"IPHONE6+_64G",
    "IPHONE6+_128G":"IPHONE6+_128G",
    "IPHONE6S_16G":"IPHONE6S_16G",
    "IPHONE6S_64G":"IPHONE6S_64G",
    "IPHONE6S_128G":"IPHONE6S_128G",
    "IPHONE6S+_16G":"IPHONE6S+_16G",
    "IPHONE6S+_64G":"IPHONE6S+_64G",
    "IPHONE6S+_128G":"IPHONE6S+_128G",
    "SM-N915S":"N915",
    "SM-N916S":"N916",
    "SM-G150NS":"G150",
    "SM-A510S":"A510",
    "SM-A710S":"A710",
    "SM-A800S":"A800",
    "LG-F460S":"F460",
    "LG-F470S":"F470",
    "LG-F480S":"F480",
    "LG-F500S":"F500",
    "LG-F510S":"F510",
    "LG-F570S":"F570",
    "LG-F600S":"F600",
    "SM-A310N0":"A310",
    "SM-A700S":"A700",
    "SM-G720N0":"G720",
    "SM-J500N0":"J500",
    "SM-J320N0":"J320",
    "SM-J510S":"J510",
    "SM-J710K":"J710",
    "SM-J510K":"J510",
    "SM-J510N":"J510",
    "SM-J510L":"J510",
    "J510L":"J510",
    "G928L":"G928_32G",
    "G935L64":"G928_64G",
    "LG-F400S":"F400",
    "LG-F670S":"F670",
    "LG-F720S":"F720",
    "SM-N920S_64GG":"N920_64G",
    "SM-N920S_128GG":"N920_128G",
    "LG-F370S":"F370",
    "LG-F540S":"F540",
    "LG-F650S":"F650",
    "N920K-64G":"N920_64G",
    "SM-N920K":"N920_32G",
    "SM-N916K":"N916",
    "SM-N910K":"N910",
    "G935K_64G":"G935_64G",
    "SM-G935K":"G935_32G",
    "G930K_64G":"G930_64G",
    "SM-G930K":"G930_32G",
    "SM-G928K":"G928_32G",
    "G925K_128G":"G925_128G",
    "G925K_64G":"G925_64G",
    "SM-G925K":"G925_32G",
    "G920K_64G":"G920_64G",
    "SM-G920K":"G920_32G",
    "SM-G150N":"G150",
    "SM-J700K":"J700",
    "SM-J500N":"J500",
    "SM-A710K":"A710",
    "SM-A700K":"A700",
    "SM-A510K":"A510",
    "SM-A500K":"A500",
    "SM-A310N":"A310",
    "LG-F720K":"F720",
    "LG-F700K":"F700",
    "LG-F670K":"F670",
    "LG-F650K":"F650",
    "LG-F620K":"F620",
    "LG-F610K":"F610",
    "LG-F600K":"F600",
    "LG-F560K":"F560",
    "LG-F520K":"F520",
    "LG-F500K":"F500",
    "LG-F460K":"F460",
    "LG-F400K":"F400",
    "AIP6-128":"IPHONE6_128G",
    "AIP6-64":"IPHONE6_64G",
    "AIP6-16":"IPHONE6_16G",
    "AIP6P-128":"IPHONE6+_128G",
    "AIP6P-64":"IPHONE6+_64G",
    "AIP6P-16":"IPHONE6+_16G",
    "AIP6S-128":"IPHONE6S_128G",
    "AIP6S-64":"IPHONE6S_64G",
    "AIP6S-16":"IPHONE6S_16G",
    "AIP6SP-128":"IPHONE6S+_128G",
    "AIP6SP-64":"IPHONE6S+_64G",
    "AIP6SP-16":"IPHONE6S+_16G",
    "SM-N920K_64G":"N920_64G",
    "SM-G930KGD_64G":"G930_64G",
    "SM-G935KGD_64G":"G935_64G",
    "G920_64G":"G920_64G",
    "SM-A310NO":"A310",
    "SM-J700N0":"J700",
    "SM-G150NK":"G150",
    "N920KGD_64G":"N920_64G",
    "G930KGD_64G":"G930_64G",
    "G935KGD_64G":"G935_64G",
    "SM-J500N00":"J500",
    "G930K_32G":"G930_32G",
    "G935K_32G":"G935_32G", 
    "SM-G720N":"G720",
    "SM-A310K":"A310",
    "LG-F500K©":"F500",
    "A1586-16":"IPHONE6_16G",
    "A1586-64":"IPHONE6_64G",
    "A1586-128":"IPHONE6_128G",
    "A1524-16":"IPHONE6+_16G",
    "A1524-64":"IPHONE6+_64G",
    "A1524-128":"IPHONE6+_128G",
    "A1688-16":"IPHONE6S_16G",
    "A1688-64":"IPHONE6S_64G",
    "A1688-128":"IPHONE6S_128G",
    "A1687-16":"IPHONE6S+_16G",
    "A1687-64":"IPHONE6S+_64G",
    "A1687-128":"IPHONE6S+_128G",
    "LG-F440L":"F440",
    "SM-A700L":"A700",
    "SM-A510L":"A510",
    "SM-A710L":"A710",
    "SM-N916L":"N916",
    "SM-G920L":"G920_32G",
    "SM-G920L64":"G920_64G",
    "SM-G925L":"G925_32G",
    "SM-G925L64":"G925_64G",
    "HW-SCL-L32":"HW-SCL-L32",
    "LG-F700L":"F700",
    "LG-F600L":"F600",
    "LG-F670L":"F670",
    "LG-F580L":"F580",
    "LG-F500L":"F500",
    "LG-F400L":"F400",
    "LG-F460L":"F460",
    "LG-F620L":"F620",
    "LG-F720L":"F720",
    "SM-G930L":"G930_32G",
    "SM-G930L64":"G930_64G",
    "SM-G935L":"G935_32G",
    "SM-G935L64":"G935_64G",
    "SM-G150NL":"G150",
    "SM-J500NO":"J500",
    "SM-N920L":"N920_32G",
    "SM-N920L64":"N920_64G",
    "SM-G928L":"G928_32G",
    "SM-N920L(64)":"N920_64G",
    "LG-F400":"F400",
    "F460L":"F460",
    "F500L":"F500",
    "F580L":"F580",
    "F600L":"F600",
    "F620L":"F620",
    "F670L":"F670",
    "F700L":"F700",
    "F720L":"F720",
    "G150NL":"G150",
    "J500N0":"J500",
    "A700L":"A700",
    "A310L":"A310",
    "A510L":"A510",
    "A710L":"A710",
    "G720N0":"G720",
    "G930L":"G930_32G",
    "G930L64":"G930_64G",
    "G935L":"G935_32G",
    "N916L":"N916",
    "N920L":"N920_32G",
    "N920L64":"N920_64G",
    "LG-W200L":"W200",
    "A1723-16":"IPHONE6+_64G",
    "A1723-64":"IPHONE6+_128G"
}
function device_change(beforeModel){
   return device_list[beforeModel]
};



exports.savePrice = function(callback){
    var sk_ps = [];
    var sk_ace = [];
    var kt_mir = [];
    var kt_cod = [];
    var kt_kwangjin = [];
    var kt_seocho = [];
    var lg_dream = [];
    var lg_sungbook = [];
    var lg_kwangjin = [];
    var lg_seocho = [];
    var promise1 = function(){
        return new Promise(function(resolve){
            fs.exists(SK_PS_PATH, (exists) => {
                if(!exists){
                    console.log("SK_PS_PATH Not exists");
                }
                else{
                    var obj = excel.parse(SK_PS_PATH);
                    for (var i = 28;i<78;i++){
                        var modelname = device_change(obj[1].data[i][1]);
                        if(modelname==undefined){
                            console.log("SK_PS 모델명이 없습니다 : "+obj[1].data[i][1]);
                        }
                        else{
                            
                            SK_PS.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[1].data[i][6]*10000,
                                    ofc_mnp_59 : obj[1].data[i][7]*10000,
                                    ofc_chn_59 : obj[1].data[i][8]*10000,
                                    ofc_new_51 : obj[1].data[i][9]*10000,
                                    ofc_mnp_51 : obj[1].data[i][10]*10000,
                                    ofc_chn_51 : obj[1].data[i][11]*10000,
                                    ofc_new_36 : obj[1].data[i][12]*10000,
                                    ofc_mnp_36 : obj[1].data[i][13]*10000,
                                    ofc_chn_36 : obj[1].data[i][14]*10000,
                                    cho_new_59 : obj[1].data[i][15]*10000,
                                    cho_mnp_59 : obj[1].data[i][16]*10000,
                                    cho_chn_59 : obj[1].data[i][17]*10000,
                                    cho_new_51 : obj[1].data[i][18]*10000,
                                    cho_mnp_51 : obj[1].data[i][19]*10000,
                                    cho_chn_51 : obj[1].data[i][20]*10000,
                                    cho_new_36 : obj[1].data[i][21]*10000,
                                    cho_mnp_36 : obj[1].data[i][22]*10000,
                                    cho_chn_36 : obj[1].data[i][23]*10000,
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("SK_PS Update error"+err);
                                    }
                                }
                            );
                            sk_ps.push(
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[1].data[i][6]*10000,
                                    ofc_mnp_59 : obj[1].data[i][7]*10000,
                                    ofc_chn_59 : obj[1].data[i][8]*10000,
                                    ofc_new_51 : obj[1].data[i][9]*10000,
                                    ofc_mnp_51 : obj[1].data[i][10]*10000,
                                    ofc_chn_51 : obj[1].data[i][11]*10000,
                                    ofc_new_36 : obj[1].data[i][12]*10000,
                                    ofc_mnp_36 : obj[1].data[i][13]*10000,
                                    ofc_chn_36 : obj[1].data[i][14]*10000,
                                    cho_new_59 : obj[1].data[i][15]*10000,
                                    cho_mnp_59 : obj[1].data[i][16]*10000,
                                    cho_chn_59 : obj[1].data[i][17]*10000,
                                    cho_new_51 : obj[1].data[i][18]*10000,
                                    cho_mnp_51 : obj[1].data[i][19]*10000,
                                    cho_chn_51 : obj[1].data[i][20]*10000,
                                    cho_new_36 : obj[1].data[i][21]*10000,
                                    cho_mnp_36 : obj[1].data[i][22]*10000,
                                    cho_chn_36 : obj[1].data[i][23]*10000,
                                }
                            );
                        }
                    };
                }
                resolve();
            });
        })
    };
    var promise2 = function(){
        return new Promise(function(resolve){
            fs.exists(SK_ACE_PATH, (exists) => {
                if(!exists){
                    console.log("SK_ACE_PATH Not exists");
                }
                else{
                    var obj = excel.parse(SK_ACE_PATH);
                    for (var i = 8;i<54;i++){
                        var modelname = device_change(obj[3].data[i][2]);
                        if(modelname==undefined){
                            console.log("SK_ACE 모델명이 없습니다 : "+obj[3].data[i][2]);
                        }
                        else{
                            SK_ACE.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[3].data[i][6]*10000,
                                    ofc_mnp_59 : obj[3].data[i][7]*10000, 
                                    ofc_chn_59 : obj[3].data[i][8]*10000,
                                    ofc_new_51 : obj[3].data[i][9]*10000,
                                    ofc_mnp_51 : obj[3].data[i][10]*10000,
                                    ofc_chn_51 : obj[3].data[i][11]*10000,
                                    ofc_new_36 : obj[3].data[i][12]*10000,
                                    ofc_mnp_36 : obj[3].data[i][13]*10000,
                                    ofc_chn_36 : obj[3].data[i][14]*10000,
                                    ofc_new_el : obj[3].data[i][15]*10000,
                                    ofc_mnp_el : obj[3].data[i][16]*10000,
                                    ofc_chn_el : obj[3].data[i][17]*10000,
                                    cho_new_59 : obj[3].data[i][18]*10000,
                                    cho_mnp_59 : obj[3].data[i][19]*10000,
                                    cho_chn_59 : obj[3].data[i][20]*10000,
                                    cho_new_51 : obj[3].data[i][21]*10000,
                                    cho_mnp_51 : obj[3].data[i][22]*10000, 
                                    cho_chn_51 : obj[3].data[i][23]*10000,
                                    cho_new_36 : obj[3].data[i][24]*10000,
                                    cho_mnp_36 : obj[3].data[i][25]*10000,
                                    cho_chn_36 : obj[3].data[i][26]*10000,
                                    cho_new_el : obj[3].data[i][27]*10000,
                                    cho_mnp_el : obj[3].data[i][28]*10000, 
                                    cho_chn_el : obj[3].data[i][29]*10000,
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("SK_ACE Update error"+err);
                                    }
                                }
                            );   
                            sk_ace.push(
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[3].data[i][6]*10000,
                                    ofc_mnp_59 : obj[3].data[i][7]*10000, 
                                    ofc_chn_59 : obj[3].data[i][8]*10000,
                                    ofc_new_51 : obj[3].data[i][9]*10000,
                                    ofc_mnp_51 : obj[3].data[i][10]*10000,
                                    ofc_chn_51 : obj[3].data[i][11]*10000,
                                    ofc_new_36 : obj[3].data[i][12]*10000,
                                    ofc_mnp_36 : obj[3].data[i][13]*10000,
                                    ofc_chn_36 : obj[3].data[i][14]*10000,
                                    ofc_new_el : obj[3].data[i][15]*10000,
                                    ofc_mnp_el : obj[3].data[i][16]*10000,
                                    ofc_chn_el : obj[3].data[i][17]*10000,
                                    cho_new_59 : obj[3].data[i][18]*10000,
                                    cho_mnp_59 : obj[3].data[i][19]*10000,
                                    cho_chn_59 : obj[3].data[i][20]*10000,
                                    cho_new_51 : obj[3].data[i][21]*10000,
                                    cho_mnp_51 : obj[3].data[i][22]*10000, 
                                    cho_chn_51 : obj[3].data[i][23]*10000,
                                    cho_new_36 : obj[3].data[i][24]*10000,
                                    cho_mnp_36 : obj[3].data[i][25]*10000,
                                    cho_chn_36 : obj[3].data[i][26]*10000,
                                    cho_new_el : obj[3].data[i][27]*10000,
                                    cho_mnp_el : obj[3].data[i][28]*10000, 
                                    cho_chn_el : obj[3].data[i][29]*10000,
                                }
                            );
                        }
                    }
                }
                resolve();
            });
        });
    }
    var promise3 = function(){
        return new Promise(function(resolve){
            fs.exists(KT_MIR_PATH, (exists) => {
                if(!exists){
                    console.log("KT_MIR_PATH Not exists");
                }
                else{
                    var obj = excel.parse(KT_MIR_PATH);
                    for (var i = 8;i<57;i++){
                        var modelname = device_change(obj[0].data[i][2]);
                        if(modelname==undefined){
                            console.log("KT_MIR 모델명이 없습니다 : "+obj[0].data[i][2]);
                        }
                        else{
                            KT_MIR.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][7]*10000,
                                    ofc_mnp_61 : obj[0].data[i][8]*10000, 
                                    ofc_chn_61 : obj[0].data[i][9]*10000,
                                    ofc_new_51 : obj[0].data[i][10]*10000,
                                    ofc_mnp_51 : obj[0].data[i][11]*10000,
                                    ofc_chn_51 : obj[0].data[i][12]*10000,
                                    ofc_new_t34 : obj[0].data[i][13]*10000,
                                    ofc_mnp_t34 : obj[0].data[i][14]*10000,
                                    ofc_chn_t34 : obj[0].data[i][15]*10000,
                                    ofc_new_28 : obj[0].data[i][16]*10000,
                                    ofc_mnp_28 : obj[0].data[i][17]*10000,
                                    ofc_chn_28 : obj[0].data[i][18]*10000,
                                    cho_new_61 : obj[0].data[i][19]*10000,
                                    cho_mnp_61 : obj[0].data[i][20]*10000,
                                    cho_chn_61 : obj[0].data[i][21]*10000,
                                    cho_new_51 : obj[0].data[i][22]*10000,
                                    cho_mnp_51 : obj[0].data[i][23]*10000, 
                                    cho_chn_51 : obj[0].data[i][24]*10000,
                                    cho_new_t34 : obj[0].data[i][25]*10000,
                                    cho_mnp_t34 : obj[0].data[i][26]*10000,
                                    cho_chn_t34 : obj[0].data[i][27]*10000,
                                    cho_new_28 : obj[0].data[i][28]*10000,
                                    cho_mnp_28 : obj[0].data[i][29]*10000, 
                                    cho_chn_28 : obj[0].data[i][30]*10000,
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("KT_MIR Update error"+err);
                                    }
                                }
                            );
                            kt_mir.push(
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][7]*10000,
                                    ofc_mnp_61 : obj[0].data[i][8]*10000, 
                                    ofc_chn_61 : obj[0].data[i][9]*10000,
                                    ofc_new_51 : obj[0].data[i][10]*10000,
                                    ofc_mnp_51 : obj[0].data[i][11]*10000,
                                    ofc_chn_51 : obj[0].data[i][12]*10000,
                                    ofc_new_t34 : obj[0].data[i][13]*10000,
                                    ofc_mnp_t34 : obj[0].data[i][14]*10000,
                                    ofc_chn_t34 : obj[0].data[i][15]*10000,
                                    ofc_new_28 : obj[0].data[i][16]*10000,
                                    ofc_mnp_28 : obj[0].data[i][17]*10000,
                                    ofc_chn_28 : obj[0].data[i][18]*10000,
                                    cho_new_61 : obj[0].data[i][19]*10000,
                                    cho_mnp_61 : obj[0].data[i][20]*10000,
                                    cho_chn_61 : obj[0].data[i][21]*10000,
                                    cho_new_51 : obj[0].data[i][22]*10000,
                                    cho_mnp_51 : obj[0].data[i][23]*10000, 
                                    cho_chn_51 : obj[0].data[i][24]*10000,
                                    cho_new_t34 : obj[0].data[i][25]*10000,
                                    cho_mnp_t34 : obj[0].data[i][26]*10000,
                                    cho_chn_t34 : obj[0].data[i][27]*10000,
                                    cho_new_28 : obj[0].data[i][28]*10000,
                                    cho_mnp_28 : obj[0].data[i][29]*10000, 
                                    cho_chn_28 : obj[0].data[i][30]*10000,
                                }
                            );   
                        }
                    }
                }
                resolve();
            });
        });
    };
    var promise4 = function(){
        return new Promise(function(resolve){
            fs.exists(KT_COD_PATH, (exists) => {
                if(!exists){
                    console.log("KT_COD_PATH Not exists");
                }
                else{
                    var obj = excel.parse(KT_COD_PATH);
                    for (var i = 40;i<83;i++){
                        var modelname = device_change(obj[0].data[i][3]);
                        if(modelname==undefined){
                            console.log("KT_COD 모델명이 없습니다 : "+obj[0].data[i][3]);
                        }
                        else{
                            KT_COD.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][8]*10000,
                                    ofc_mnp_61 : obj[0].data[i][9]*10000, 
                                    ofc_chn_61 : obj[0].data[i][10]*10000,
                                    ofc_new_51 : obj[0].data[i][11]*10000,
                                    ofc_mnp_51 : obj[0].data[i][12]*10000,
                                    ofc_chn_51 : obj[0].data[i][13]*10000,
                                    ofc_new_23 : obj[0].data[i][14]*10000,
                                    ofc_mnp_23 : obj[0].data[i][15]*10000,
                                    ofc_chn_23 : obj[0].data[i][16]*10000,
                                    ofc_new_t34 : obj[0].data[i][17]*10000,
                                    ofc_mnp_t34 : obj[0].data[i][18]*10000,
                                    ofc_chn_t34 : obj[0].data[i][19]*10000,
                                    cho_new_61 : obj[0].data[i][20]*10000,
                                    cho_mnp_61 : obj[0].data[i][21]*10000,
                                    cho_chn_61 : obj[0].data[i][22]*10000,
                                    cho_new_23 : obj[0].data[i][23]*10000,
                                    cho_mnp_23 : obj[0].data[i][24]*10000, 
                                    cho_chn_23 : obj[0].data[i][25]*10000,
                                    cho_new_t34 : obj[0].data[i][26]*10000,
                                    cho_mnp_t34 : obj[0].data[i][27]*10000,
                                    cho_chn_t34 : obj[0].data[i][28]*10000,
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("KT_COD Update error"+err);
                                    }
                                }
                            );
                            kt_cod.push(
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][8]*10000,
                                    ofc_mnp_61 : obj[0].data[i][9]*10000, 
                                    ofc_chn_61 : obj[0].data[i][10]*10000,
                                    ofc_new_51 : obj[0].data[i][11]*10000,
                                    ofc_mnp_51 : obj[0].data[i][12]*10000,
                                    ofc_chn_51 : obj[0].data[i][13]*10000,
                                    ofc_new_23 : obj[0].data[i][14]*10000,
                                    ofc_mnp_23 : obj[0].data[i][15]*10000,
                                    ofc_chn_23 : obj[0].data[i][16]*10000,
                                    ofc_new_t34 : obj[0].data[i][17]*10000,
                                    ofc_mnp_t34 : obj[0].data[i][18]*10000,
                                    ofc_chn_t34 : obj[0].data[i][19]*10000,
                                    cho_new_61 : obj[0].data[i][20]*10000,
                                    cho_mnp_61 : obj[0].data[i][21]*10000,
                                    cho_chn_61 : obj[0].data[i][22]*10000,
                                    cho_new_23 : obj[0].data[i][23]*10000,
                                    cho_mnp_23 : obj[0].data[i][24]*10000, 
                                    cho_chn_23 : obj[0].data[i][25]*10000,
                                    cho_new_t34 : obj[0].data[i][26]*10000,
                                    cho_mnp_t34 : obj[0].data[i][27]*10000,
                                    cho_chn_t34 : obj[0].data[i][28]*10000,
                                }
                            );   
                        }
                    }
                }
                resolve();
            });
        });
    };
    var promise5 = function(){
        return new Promise(function(resolve){
            fs.exists(KT_KWANGJIN_PATH, (exists) => {
                if(!exists){
                    console.log("KT_KWANGJIN_PATH Not exists");
                }
                else{
                    var obj = excel.parse(KT_KWANGJIN_PATH);
                    for (var i = 21;i<61;i++){
                        for(var j = 6;j<21;j++){
                            if(typeof(obj[0].data[i][j])!='number'){
                                obj[0].data[i][j] = 0;
                            }
                        }
                        var modelname = device_change(obj[0].data[i][3]);
                        if(modelname==undefined){
                            console.log("KT_KWANGJIN 모델명이 없습니다 : "+obj[0].data[i][3]);
                        }
                        else{
                            KT_KWANGJIN.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][6]*10000,
                                    ofc_mnp_61 : obj[0].data[i][7]*10000, 
                                    ofc_chn_61 : obj[0].data[i][8]*10000,
                                    ofc_new_51 : obj[0].data[i][10]*10000,
                                    ofc_mnp_51 : obj[0].data[i][11]*10000,
                                    ofc_chn_51 : obj[0].data[i][12]*10000,
                                    ofc_new_23 : obj[0].data[i][14]*10000,
                                    ofc_mnp_23 : obj[0].data[i][15]*10000,
                                    ofc_chn_23 : obj[0].data[i][16]*10000,
                                    ofc_new_t34 : obj[0].data[i][18]*10000,
                                    ofc_mnp_t34 : obj[0].data[i][19]*10000,
                                    ofc_chn_t34 : obj[0].data[i][20]*10000,
                                    cho_new_61 : obj[0].data[i][6]*10000,
                                    cho_mnp_61 : obj[0].data[i][7]*10000, 
                                    cho_chn_61 : obj[0].data[i][8]*10000,
                                    cho_new_51 : obj[0].data[i][10]*10000,
                                    cho_mnp_51 : obj[0].data[i][11]*10000,
                                    cho_chn_51 : obj[0].data[i][12]*10000,
                                    cho_new_23 : obj[0].data[i][14]*10000,
                                    cho_mnp_23 : obj[0].data[i][15]*10000,
                                    cho_chn_23 : obj[0].data[i][16]*10000,
                                    cho_new_t34 : obj[0].data[i][18]*10000,
                                    cho_mnp_t34 : obj[0].data[i][19]*10000,
                                    cho_chn_t34 : obj[0].data[i][20]*10000
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("KT_KWANGJIN Update error"+err);
                                    }
                                }
                            );
                            kt_kwangjin.push(
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][6]*10000,
                                    ofc_mnp_61 : obj[0].data[i][7]*10000, 
                                    ofc_chn_61 : obj[0].data[i][8]*10000,
                                    ofc_new_51 : obj[0].data[i][10]*10000,
                                    ofc_mnp_51 : obj[0].data[i][11]*10000,
                                    ofc_chn_51 : obj[0].data[i][12]*10000,
                                    ofc_new_23 : obj[0].data[i][14]*10000,
                                    ofc_mnp_23 : obj[0].data[i][15]*10000,
                                    ofc_chn_23 : obj[0].data[i][16]*10000,
                                    ofc_new_t34 : obj[0].data[i][18]*10000,
                                    ofc_mnp_t34 : obj[0].data[i][19]*10000,
                                    ofc_chn_t34 : obj[0].data[i][20]*10000,
                                    cho_new_61 : obj[0].data[i][6]*10000,
                                    cho_mnp_61 : obj[0].data[i][7]*10000, 
                                    cho_chn_61 : obj[0].data[i][8]*10000,
                                    cho_new_51 : obj[0].data[i][10]*10000,
                                    cho_mnp_51 : obj[0].data[i][11]*10000,
                                    cho_chn_51 : obj[0].data[i][12]*10000,
                                    cho_new_23 : obj[0].data[i][14]*10000,
                                    cho_mnp_23 : obj[0].data[i][15]*10000,
                                    cho_chn_23 : obj[0].data[i][16]*10000,
                                    cho_new_t34 : obj[0].data[i][18]*10000,
                                    cho_mnp_t34 : obj[0].data[i][19]*10000,
                                    cho_chn_t34 : obj[0].data[i][20]*10000
                                }
                            );   
                        }
                    }
                }
                resolve();
            });
        });
    };
    var promise6 = function(){
        return new Promise(function(resolve){
            fs.exists(KT_SEOCHO_PATH, (exists) => {
                if(!exists){
                    console.log("KT_SEOCHO_PATH Not exists");
                }
                else{
                    var obj = excel.parse(KT_SEOCHO_PATH);
                    for (var i = 24;i<56;i++){
                        var modelname = device_change(obj[0].data[i][3]);
                        if(modelname==undefined){
                            console.log("KT_SEOCHO 모델명이 없습니다 : "+obj[0].data[i][3]);
                        }
                        else{
                            KT_SEOCHO.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][7]*1000,
                                    ofc_mnp_61 : obj[0].data[i][8]*1000,
                                    ofc_chn_61 : obj[0].data[i][9]*1000,
                                    ofc_new_51 : obj[0].data[i][10]*1000,
                                    ofc_mnp_51 : obj[0].data[i][11]*1000,
                                    ofc_chn_51 : obj[0].data[i][12]*1000,
                                    ofc_new_23 : obj[0].data[i][13]*1000,
                                    ofc_mnp_23 : obj[0].data[i][14]*1000,
                                    ofc_chn_23 : obj[0].data[i][15]*1000,
                                    cho_new_61 : obj[0].data[i][16]*1000,
                                    cho_mnp_61 : obj[0].data[i][17]*1000,
                                    cho_chn_61 : obj[0].data[i][18]*1000,
                                    cho_new_51 : obj[0].data[i][19]*1000,
                                    cho_mnp_51 : obj[0].data[i][20]*1000,
                                    cho_chn_51 : obj[0].data[i][21]*1000,
                                    cho_new_23 : obj[0].data[i][22]*1000,
                                    cho_mnp_23 : obj[0].data[i][23]*1000,
                                    cho_chn_23 : obj[0].data[i][24]*1000,
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("KT_SEOCHO Update error"+err);
                                    }
                                }
                            );
                            kt_seocho.push(
                            {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][7]*1000,
                                    ofc_mnp_61 : obj[0].data[i][8]*1000,
                                    ofc_chn_61 : obj[0].data[i][9]*1000,
                                    ofc_new_51 : obj[0].data[i][10]*1000,
                                    ofc_mnp_51 : obj[0].data[i][11]*1000,
                                    ofc_chn_51 : obj[0].data[i][12]*1000,
                                    ofc_new_23 : obj[0].data[i][13]*1000,
                                    ofc_mnp_23 : obj[0].data[i][14]*1000,
                                    ofc_chn_23 : obj[0].data[i][15]*1000,
                                    cho_new_61 : obj[0].data[i][16]*1000,
                                    cho_mnp_61 : obj[0].data[i][17]*1000,
                                    cho_chn_61 : obj[0].data[i][18]*1000,
                                    cho_new_51 : obj[0].data[i][19]*1000,
                                    cho_mnp_51 : obj[0].data[i][20]*1000,
                                    cho_chn_51 : obj[0].data[i][21]*1000,
                                    cho_new_23 : obj[0].data[i][22]*1000,
                                    cho_mnp_23 : obj[0].data[i][23]*1000,
                                    cho_chn_23 : obj[0].data[i][24]*1000,
                                } 
                            );   
                        }
                    }   
                    for (var i = 60;i<66;i++){
                        var modelname = device_change(obj[0].data[i][3]);
                        if(modelname==undefined){
                            console.log("KT_SEOCHO 모델명이 없습니다 : "+obj[0].data[i][3]);
                        }
                        else{
                            KT_SEOCHO.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][7]*1000,
                                    ofc_mnp_61 : obj[0].data[i][8]*1000,
                                    ofc_chn_61 : obj[0].data[i][9]*1000,
                                    ofc_new_51 : obj[0].data[i][10]*1000,
                                    ofc_mnp_51 : obj[0].data[i][11]*1000,
                                    ofc_chn_51 : obj[0].data[i][12]*1000,
                                    ofc_new_23 : obj[0].data[i][13]*1000,
                                    ofc_mnp_23 : obj[0].data[i][14]*1000,
                                    ofc_chn_23 : obj[0].data[i][15]*1000,
                                    cho_new_61 : obj[0].data[i][16]*1000,
                                    cho_mnp_61 : obj[0].data[i][17]*1000,
                                    cho_chn_61 : obj[0].data[i][18]*1000,
                                    cho_new_51 : obj[0].data[i][19]*1000,
                                    cho_mnp_51 : obj[0].data[i][20]*1000,
                                    cho_chn_51 : obj[0].data[i][21]*1000,
                                    cho_new_23 : obj[0].data[i][22]*1000,
                                    cho_mnp_23 : obj[0].data[i][23]*1000,
                                    cho_chn_23 : obj[0].data[i][24]*1000,
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("KT_SEOCHO Update error"+err);
                                    }
                                }
                            );  
                            kt_seocho.push(
                            {
                                    model:modelname,
                                    ofc_new_61 : obj[0].data[i][7]*1000,
                                    ofc_mnp_61 : obj[0].data[i][8]*1000,
                                    ofc_chn_61 : obj[0].data[i][9]*1000,
                                    ofc_new_51 : obj[0].data[i][10]*1000,
                                    ofc_mnp_51 : obj[0].data[i][11]*1000,
                                    ofc_chn_51 : obj[0].data[i][12]*1000,
                                    ofc_new_23 : obj[0].data[i][13]*1000,
                                    ofc_mnp_23 : obj[0].data[i][14]*1000,
                                    ofc_chn_23 : obj[0].data[i][15]*1000,
                                    cho_new_61 : obj[0].data[i][16]*1000,
                                    cho_mnp_61 : obj[0].data[i][17]*1000,
                                    cho_chn_61 : obj[0].data[i][18]*1000,
                                    cho_new_51 : obj[0].data[i][19]*1000,
                                    cho_mnp_51 : obj[0].data[i][20]*1000,
                                    cho_chn_51 : obj[0].data[i][21]*1000,
                                    cho_new_23 : obj[0].data[i][22]*1000,
                                    cho_mnp_23 : obj[0].data[i][23]*1000,
                                    cho_chn_23 : obj[0].data[i][24]*1000,
                                } 
                            ); 
                        }
                    }
                }
                resolve();
            });
        });
    };
    var promise7 = function(){
        return new Promise(function(resolve){
            fs.exists(LG_DREAM_PATH, (exists) => {
                if(!exists){
                    console.log("LG_DREAM_PATH Not exists");
                }
                else{
                    var obj = excel.parse(LG_DREAM_PATH);
                    for (var i = 14;i<55;i++){
                        var modelname = device_change(obj[0].data[i][4]);
                        if(modelname==undefined){
                            console.log("LG_DREAM 모델명이 없습니다 : "+obj[0].data[i][4]);
                        }
                        else{
                            LG_DREAM.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[0].data[i][7]*10000,
                                    ofc_mnp_59 : obj[0].data[i][8]*10000,
                                    ofc_chn_59 : obj[0].data[i][9]*10000,
                                    ofc_new_51: obj[0].data[i][10]*10000,
                                    ofc_mnp_51 : obj[0].data[i][11]*10000,
                                    ofc_chn_51 : obj[0].data[i][12]*10000,
                                    ofc_new_46 : obj[0].data[i][13]*10000,
                                    ofc_mnp_46 : obj[0].data[i][14]*10000,
                                    ofc_chn_46 : obj[0].data[i][15]*10000,
                                    ofc_new_29 : obj[0].data[i][16]*10000,
                                    ofc_mnp_29 : obj[0].data[i][17]*10000,
                                    ofc_chn_29 : obj[0].data[i][18]*10000,
                                    ofc_new_t29 : obj[0].data[i][19]*10000,
                                    ofc_mnp_t29 : obj[0].data[i][20]*10000,
                                    ofc_chn_t29 : obj[0].data[i][21]*10000,
                                    cho_new_59 : obj[0].data[i][7]*10000,
                                    cho_mnp_59 : obj[0].data[i][8]*10000,
                                    cho_chn_59 : obj[0].data[i][9]*10000,
                                    cho_new_51: obj[0].data[i][10]*10000,
                                    cho_mnp_51 : obj[0].data[i][11]*10000,
                                    cho_chn_51 : obj[0].data[i][12]*10000,
                                    cho_new_46 : obj[0].data[i][13]*10000,
                                    cho_mnp_46 : obj[0].data[i][14]*10000,
                                    cho_chn_46 : obj[0].data[i][15]*10000,
                                    cho_new_29 : obj[0].data[i][16]*10000,
                                    cho_mnp_29 : obj[0].data[i][17]*10000,
                                    cho_chn_29 : obj[0].data[i][18]*10000,
                                    cho_new_t29 : obj[0].data[i][19]*10000,
                                    cho_mnp_t29 : obj[0].data[i][20]*10000,
                                    cho_chn_t29 : obj[0].data[i][21]*10000
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("LG_DREAM Update error"+err);
                                    }
                                }
                            );
                            lg_dream.push(
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[0].data[i][7]*10000,
                                    ofc_mnp_59 : obj[0].data[i][8]*10000,
                                    ofc_chn_59 : obj[0].data[i][9]*10000,
                                    ofc_new_51: obj[0].data[i][10]*10000,
                                    ofc_mnp_51 : obj[0].data[i][11]*10000,
                                    ofc_chn_51 : obj[0].data[i][12]*10000,
                                    ofc_new_46 : obj[0].data[i][13]*10000,
                                    ofc_mnp_46 : obj[0].data[i][14]*10000,
                                    ofc_chn_46 : obj[0].data[i][15]*10000,
                                    ofc_new_29 : obj[0].data[i][16]*10000,
                                    ofc_mnp_29 : obj[0].data[i][17]*10000,
                                    ofc_chn_29 : obj[0].data[i][18]*10000,
                                    ofc_new_t29 : obj[0].data[i][19]*10000,
                                    ofc_mnp_t29 : obj[0].data[i][20]*10000,
                                    ofc_chn_t29 : obj[0].data[i][21]*10000,
                                    cho_new_59 : obj[0].data[i][7]*10000,
                                    cho_mnp_59 : obj[0].data[i][8]*10000,
                                    cho_chn_59 : obj[0].data[i][9]*10000,
                                    cho_new_51: obj[0].data[i][10]*10000,
                                    cho_mnp_51 : obj[0].data[i][11]*10000,
                                    cho_chn_51 : obj[0].data[i][12]*10000,
                                    cho_new_46 : obj[0].data[i][13]*10000,
                                    cho_mnp_46 : obj[0].data[i][14]*10000,
                                    cho_chn_46 : obj[0].data[i][15]*10000,
                                    cho_new_29 : obj[0].data[i][16]*10000,
                                    cho_mnp_29 : obj[0].data[i][17]*10000,
                                    cho_chn_29 : obj[0].data[i][18]*10000,
                                    cho_new_t29 : obj[0].data[i][19]*10000,
                                    cho_mnp_t29 : obj[0].data[i][20]*10000,
                                    cho_chn_t29 : obj[0].data[i][21]*10000
                                }
                            );   
                        }
                    }   
                }
                resolve();
            });
        });
    };
    var promise8 = function(){
        return new Promise(function(resolve){
            fs.exists(LG_SUNGBOOK_PATH, (exists) => {
                if(!exists){
                    console.log("LG_SUNGBOOK_PATH Not exists");
                }
                else{
                    var obj = excel.parse(LG_SUNGBOOK_PATH);
                    for (var i = 25;i<60;i++){
                        var modelname = device_change(obj[0].data[i][3].replace(/\s/g,""));
                        if(modelname==undefined){
                            console.log("LG_SUNGBOOK 모델명이 없습니다 : "+obj[0].data[i][3]);
                        }
                        else{
                            LG_SUNGBOOK.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_89 : obj[0].data[i][6]*1000,
                                    ofc_mnp_89 : obj[0].data[i][7]*1000,
                                    ofc_chn_89 : obj[0].data[i][8]*1000,
                                    ofc_new_59 : obj[0].data[i][10]*1000,
                                    ofc_mnp_59 : obj[0].data[i][11]*1000,
                                    ofc_chn_59 : obj[0].data[i][12]*1000,
                                    ofc_new_46 : obj[0].data[i][14]*1000,
                                    ofc_mnp_46 : obj[0].data[i][15]*1000,
                                    ofc_chn_46 : obj[0].data[i][16]*1000,
                                    ofc_new_t29 : obj[0].data[i][18]*1000,
                                    ofc_mnp_t29 : obj[0].data[i][19]*1000,
                                    ofc_chn_t29 : obj[0].data[i][20]*1000,
                                    ofc_new_29 : obj[0].data[i][22]*1000,
                                    ofc_mnp_29 : obj[0].data[i][23]*1000,
                                    ofc_chn_29 : obj[0].data[i][24]*1000,
                                    cho_new_89 : obj[0].data[i][6]*1000,
                                    cho_mnp_89 : obj[0].data[i][7]*1000,
                                    cho_chn_89 : obj[0].data[i][8]*1000,
                                    cho_new_59 : obj[0].data[i][10]*1000,
                                    cho_mnp_59 : obj[0].data[i][11]*1000,
                                    cho_chn_59 : obj[0].data[i][12]*1000,
                                    cho_new_46 : obj[0].data[i][14]*1000,
                                    cho_mnp_46 : obj[0].data[i][15]*1000,
                                    cho_chn_46 : obj[0].data[i][16]*1000,
                                    cho_new_t29 : obj[0].data[i][18]*1000,
                                    cho_mnp_t29 : obj[0].data[i][19]*1000,
                                    cho_chn_t29 : obj[0].data[i][20]*1000,
                                    cho_new_29 : obj[0].data[i][22]*1000,
                                    cho_mnp_29 : obj[0].data[i][23]*1000,
                                    cho_chn_29 : obj[0].data[i][24]*1000
                                    
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("LG_SUNGBOOK Update error"+err);
                                    }
                                }
                            ); 
                            lg_sungbook.push(
                                {
                                    model:modelname,
                                    ofc_new_89 : obj[0].data[i][6]*1000,
                                    ofc_mnp_89 : obj[0].data[i][7]*1000,
                                    ofc_chn_89 : obj[0].data[i][8]*1000,
                                    ofc_new_59 : obj[0].data[i][10]*1000,
                                    ofc_mnp_59 : obj[0].data[i][11]*1000,
                                    ofc_chn_59 : obj[0].data[i][12]*1000,
                                    ofc_new_46 : obj[0].data[i][14]*1000,
                                    ofc_mnp_46 : obj[0].data[i][15]*1000,
                                    ofc_chn_46 : obj[0].data[i][16]*1000,
                                    ofc_new_t29 : obj[0].data[i][18]*1000,
                                    ofc_mnp_t29 : obj[0].data[i][19]*1000,
                                    ofc_chn_t29 : obj[0].data[i][20]*1000,
                                    ofc_new_29 : obj[0].data[i][22]*1000,
                                    ofc_mnp_29 : obj[0].data[i][23]*1000,
                                    ofc_chn_29 : obj[0].data[i][24]*1000,
                                    cho_new_89 : obj[0].data[i][6]*1000,
                                    cho_mnp_89 : obj[0].data[i][7]*1000,
                                    cho_chn_89 : obj[0].data[i][8]*1000,
                                    cho_new_59 : obj[0].data[i][10]*1000,
                                    cho_mnp_59 : obj[0].data[i][11]*1000,
                                    cho_chn_59 : obj[0].data[i][12]*1000,
                                    cho_new_46 : obj[0].data[i][14]*1000,
                                    cho_mnp_46 : obj[0].data[i][15]*1000,
                                    cho_chn_46 : obj[0].data[i][16]*1000,
                                    cho_new_t29 : obj[0].data[i][18]*1000,
                                    cho_mnp_t29 : obj[0].data[i][19]*1000,
                                    cho_chn_t29 : obj[0].data[i][20]*1000,
                                    cho_new_29 : obj[0].data[i][22]*1000,
                                    cho_mnp_29 : obj[0].data[i][23]*1000,
                                    cho_chn_29 : obj[0].data[i][24]*1000
                                    
                                }
                            );  
                        }
                    }   
                }
                resolve();
            });
        });
    };
    var promise9 = function(){
        return new Promise(function(resolve){
            fs.exists(LG_KWANGJIN_PATH, (exists) => {
                if(!exists){
                    console.log("LG_KWANGJIN_PATH Not exists");
                }
                else{
                    var obj = excel.parse(LG_KWANGJIN_PATH);
                    for (var i = 5;i<43;i++){
                        var modelname = device_change(obj[0].data[i][3]);
                        if(modelname==undefined){
                            console.log("LG_KWANGJIN 모델명이 없습니다 : "+obj[0].data[i][3]);
                        }
                        else{
                            LG_KWANGJIN.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[0].data[i][7]*10000,
                                    ofc_mnp_59 : obj[0].data[i][8]*10000,
                                    ofc_chn_59 : obj[0].data[i][9]*10000,
                                    ofc_new_46 : obj[0].data[i][10]*10000,
                                    ofc_mnp_46 : obj[0].data[i][11]*10000,
                                    ofc_chn_46 : obj[0].data[i][12]*10000,
                                    ofc_new_29 : obj[0].data[i][13]*10000,
                                    ofc_mnp_29 : obj[0].data[i][14]*10000,
                                    ofc_chn_29 : obj[0].data[i][15]*10000,
                                    ofc_new_t29 : obj[0].data[i][16]*10000,
                                    ofc_mnp_t29 : obj[0].data[i][17]*10000,
                                    ofc_chn_t29 : obj[0].data[i][18]*10000,
                                    cho_new_59 : obj[0].data[i][7]*10000,
                                    cho_mnp_59 : obj[0].data[i][8]*10000,
                                    cho_chn_59 : obj[0].data[i][9]*10000,
                                    cho_new_46 : obj[0].data[i][10]*10000,
                                    cho_mnp_46 : obj[0].data[i][11]*10000,
                                    cho_chn_46 : obj[0].data[i][12]*10000,
                                    cho_new_29 : obj[0].data[i][13]*10000,
                                    cho_mnp_29 : obj[0].data[i][14]*10000,
                                    cho_chn_29 : obj[0].data[i][15]*10000,
                                    cho_new_t29 : obj[0].data[i][16]*10000,
                                    cho_mnp_t29 : obj[0].data[i][17]*10000,
                                    cho_chn_t29 : obj[0].data[i][18]*10000
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("LG_KWANGJIN Update error"+err);
                                    }
                                }
                            );
                            lg_kwangjin.push(
                                {
                                    model:modelname,
                                    ofc_new_59 : obj[0].data[i][7]*10000,
                                    ofc_mnp_59 : obj[0].data[i][8]*10000,
                                    ofc_chn_59 : obj[0].data[i][9]*10000,
                                    ofc_new_46 : obj[0].data[i][10]*10000,
                                    ofc_mnp_46 : obj[0].data[i][11]*10000,
                                    ofc_chn_46 : obj[0].data[i][12]*10000,
                                    ofc_new_29 : obj[0].data[i][13]*10000,
                                    ofc_mnp_29 : obj[0].data[i][14]*10000,
                                    ofc_chn_29 : obj[0].data[i][15]*10000,
                                    ofc_new_t29 : obj[0].data[i][16]*10000,
                                    ofc_mnp_t29 : obj[0].data[i][17]*10000,
                                    ofc_chn_t29 : obj[0].data[i][18]*10000,
                                    cho_new_59 : obj[0].data[i][7]*10000,
                                    cho_mnp_59 : obj[0].data[i][8]*10000,
                                    cho_chn_59 : obj[0].data[i][9]*10000,
                                    cho_new_46 : obj[0].data[i][10]*10000,
                                    cho_mnp_46 : obj[0].data[i][11]*10000,
                                    cho_chn_46 : obj[0].data[i][12]*10000,
                                    cho_new_29 : obj[0].data[i][13]*10000,
                                    cho_mnp_29 : obj[0].data[i][14]*10000,
                                    cho_chn_29 : obj[0].data[i][15]*10000,
                                    cho_new_t29 : obj[0].data[i][16]*10000,
                                    cho_mnp_t29 : obj[0].data[i][17]*10000,
                                    cho_chn_t29 : obj[0].data[i][18]*10000
                                }    
                            )   
                        }
                    }   
                }
                resolve();
            });
        });
    };
    var promise10 = function(){
        return new Promise(function(resolve){
            fs.exists(LG_SEOCHO_PATH, (exists) => {
                if(!exists){
                    console.log("LG_SEOCHO_PATH Not exists");
                }
                else{
                    var obj = excel.parse(LG_SEOCHO_PATH);
                    for (var i = 5;i<35;i++){
                        var modelname = device_change(obj[0].data[i][2].replace(/\s/g,""));
                        if(modelname==undefined){
                            console.log("LG_SEOCHO 모델명이 없습니다 : "+obj[0].data[i][2]);
                        }
                        else{
                            LG_SEOCHO.update(
                                {model:modelname},
                                {
                                    model:modelname,
                                    ofc_mnp_68 :obj[0].data[i][7]*1000, 
                                    ofc_mnp_59 :obj[0].data[i][8]*1000, 
                                    ofc_mnp_50 :obj[0].data[i][9]*1000, 
                                    ofc_mnp_29 :obj[0].data[i][10]*1000,
                                    ofc_mnp_t29:obj[0].data[i][11]*1000,
                                    ofc_new_68 :obj[0].data[i][12]*1000,
                                    ofc_new_59 :obj[0].data[i][13]*1000,
                                    ofc_new_50 :obj[0].data[i][14]*1000,
                                    ofc_new_29 :obj[0].data[i][15]*1000,
                                    ofc_new_t29:obj[0].data[i][16]*1000,
                                    ofc_chn_68 :obj[0].data[i][17]*1000,
                                    ofc_chn_59 :obj[0].data[i][18]*1000,
                                    ofc_chn_50 :obj[0].data[i][19]*1000,
                                    ofc_chn_29 :obj[0].data[i][20]*1000,
                                    ofc_chn_t29:obj[0].data[i][21]*1000,
                                    cho_mnp_68 :obj[0].data[i][7]*1000, 
                                    cho_mnp_59 :obj[0].data[i][8]*1000, 
                                    cho_mnp_50 :obj[0].data[i][9]*1000, 
                                    cho_mnp_29 :obj[0].data[i][10]*1000,
                                    cho_mnp_t29:obj[0].data[i][11]*1000,
                                    cho_new_68 :obj[0].data[i][12]*1000,
                                    cho_new_59 :obj[0].data[i][13]*1000,
                                    cho_new_50 :obj[0].data[i][14]*1000,
                                    cho_new_29 :obj[0].data[i][15]*1000,
                                    cho_new_t29:obj[0].data[i][16]*1000,
                                    cho_chn_68 :obj[0].data[i][17]*1000,
                                    cho_chn_59 :obj[0].data[i][18]*1000,
                                    cho_chn_50 :obj[0].data[i][19]*1000,
                                    cho_chn_29 :obj[0].data[i][20]*1000,
                                    cho_chn_t29:obj[0].data[i][21]*1000                
                                },
                                {upsert:true},
                                function(err){
                                    if(err){
                                        console.log("LG_SEOCHO Update error"+err);
                                    }
                                }
                            );
                            lg_seocho.push(
                                {
                                    model:modelname,
                                    ofc_mnp_68 :obj[0].data[i][7]*1000, 
                                    ofc_mnp_59 :obj[0].data[i][8]*1000, 
                                    ofc_mnp_50 :obj[0].data[i][9]*1000, 
                                    ofc_mnp_29 :obj[0].data[i][10]*1000,
                                    ofc_mnp_t29:obj[0].data[i][11]*1000,
                                    ofc_new_68 :obj[0].data[i][12]*1000,
                                    ofc_new_59 :obj[0].data[i][13]*1000,
                                    ofc_new_50 :obj[0].data[i][14]*1000,
                                    ofc_new_29 :obj[0].data[i][15]*1000,
                                    ofc_new_t29:obj[0].data[i][16]*1000,
                                    ofc_chn_68 :obj[0].data[i][17]*1000,
                                    ofc_chn_59 :obj[0].data[i][18]*1000,
                                    ofc_chn_50 :obj[0].data[i][19]*1000,
                                    ofc_chn_29 :obj[0].data[i][20]*1000,
                                    ofc_chn_t29:obj[0].data[i][21]*1000,
                                    cho_mnp_68 :obj[0].data[i][7]*1000, 
                                    cho_mnp_59 :obj[0].data[i][8]*1000, 
                                    cho_mnp_50 :obj[0].data[i][9]*1000, 
                                    cho_mnp_29 :obj[0].data[i][10]*1000,
                                    cho_mnp_t29:obj[0].data[i][11]*1000,
                                    cho_new_68 :obj[0].data[i][12]*1000,
                                    cho_new_59 :obj[0].data[i][13]*1000,
                                    cho_new_50 :obj[0].data[i][14]*1000,
                                    cho_new_29 :obj[0].data[i][15]*1000,
                                    cho_new_t29:obj[0].data[i][16]*1000,
                                    cho_chn_68 :obj[0].data[i][17]*1000,
                                    cho_chn_59 :obj[0].data[i][18]*1000,
                                    cho_chn_50 :obj[0].data[i][19]*1000,
                                    cho_chn_29 :obj[0].data[i][20]*1000,
                                    cho_chn_t29:obj[0].data[i][21]*1000                
                                }
                            );   
                        }
                    }   
                }
                resolve();
            });
        });
    };
    
    
    
    
    Promise.all([
        promise1(), 
        promise2(),
        promise3(), 
        promise4(),
        promise5(), 
        promise6(),
        promise7(), 
        promise8(),
        promise9(), 
        promise10(),
        ]).then(function(){
            var totalArr = [];
            var pricelist = [
                sk_ps,
                sk_ace,
                kt_mir,
                kt_cod,
                kt_kwangjin,
                kt_seocho,
                lg_dream,
                lg_sungbook,
                lg_kwangjin,
                lg_seocho
            ];
            pricelist.some(function(eachcompany,index){
                eachcompany.some(function(eachprice){
                    var modelExist = false;
                    var arr = [];
                    var modelname = "";
                    //목록에 이미 존재하는 모델명 찾기
                    totalArr.some(function(eacharr){
                        if(eachprice.model==eacharr.model){
                            modelExist = true;
                            arr = eacharr.list;
                            return false;
                        }
                        else{
                            
                        }
                    },this);
                    for(var myKey in eachprice){
                        var temp = myKey.split("_");
                        if(temp[0]=="ofc"){
                            if(temp[1]=="new"){
                                if(Number(temp[2])>=63){
                                    arr[0+pricelist.length*3*0+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=53){
                                    arr[0+pricelist.length*3*1+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=43){
                                    arr[0+pricelist.length*3*2+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=33){
                                    arr[0+pricelist.length*3*3+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=23){
                                    arr[0+pricelist.length*3*4+index*3] = eachprice[myKey];
                                }
                            }
                            else if(temp[1]=="mnp"){
                                if(Number(temp[2])>=63){
                                    arr[1+pricelist.length*3*0+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=53){
                                    arr[1+pricelist.length*3*1+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=43){
                                    arr[1+pricelist.length*3*2+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=33){
                                    arr[1+pricelist.length*3*3+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=23){
                                    arr[1+pricelist.length*3*4+index*3] = eachprice[myKey];
                                }
                            }
                            else if(temp[1]=="chn"){
                                if(Number(temp[2])>=63){
                                    arr[2+pricelist.length*3*0+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=53){
                                    arr[2+pricelist.length*3*1+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=43){
                                    arr[2+pricelist.length*3*2+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=33){
                                    arr[2+pricelist.length*3*3+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=23){
                                    arr[2+pricelist.length*3*4+index*3] = eachprice[myKey];
                                }
                            }
                        }
                        else if(temp[0]=="cho"){
                            if(temp[1]=="new"){
                                if(Number(temp[2])>=63){
                                    arr[0+pricelist.length*3*5+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=53){
                                    arr[0+pricelist.length*3*6+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=43){
                                    arr[0+pricelist.length*3*7+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=33){
                                    arr[0+pricelist.length*3*8+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=23){
                                    arr[0+pricelist.length*3*9+index*3] = eachprice[myKey];
                                }
                            }
                            else if(temp[1]=="mnp"){
                                if(Number(temp[2])>=63){
                                    arr[1+pricelist.length*3*5+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=53){
                                    arr[1+pricelist.length*3*6+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=43){
                                    arr[1+pricelist.length*3*7+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=33){
                                    arr[1+pricelist.length*3*8+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=23){
                                    arr[1+pricelist.length*3*9+index*3] = eachprice[myKey];
                                }
                            }
                            else if(temp[1]=="chn"){
                                if(Number(temp[2])>=63){
                                    arr[2+pricelist.length*3*5+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=53){
                                    arr[2+pricelist.length*3*6+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=43){
                                    arr[2+pricelist.length*3*7+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=33){
                                    arr[2+pricelist.length*3*8+index*3] = eachprice[myKey];
                                }
                                else if(Number(temp[2])>=23){
                                    arr[2+pricelist.length*3*9+index*3] = eachprice[myKey];
                                }
                            }
                        }
                    }
                    for(var j = 0;j<5;j++){
                        if(
                            arr[0+pricelist.length*3*j+index*3] == undefined ||
                            arr[1+pricelist.length*3*j+index*3] == undefined||
                            arr[2+pricelist.length*3*j+index*3] == undefined
                            ){
                                for(var k=j+1;k<5;k++){
                                    if(
                                        arr[0+pricelist.length*3*k+index*3] != undefined ||
                                        arr[1+pricelist.length*3*k+index*3] != undefined||
                                        arr[2+pricelist.length*3*k+index*3] != undefined
                                    ){
                                        arr[0+pricelist.length*3*j+index*3] = arr[0+pricelist.length*3*k+index*3]; 
                                        arr[1+pricelist.length*3*j+index*3] = arr[1+pricelist.length*3*k+index*3];
                                        arr[2+pricelist.length*3*j+index*3] = arr[2+pricelist.length*3*k+index*3];
                                        break;                                                
                                    }
                                }
                            }
                    }
                    for(var j = 5;j<10;j++){
                        if(
                            arr[0+pricelist.length*3*j+index*3] == undefined ||
                            arr[1+pricelist.length*3*j+index*3] == undefined||
                            arr[2+pricelist.length*3*j+index*3] == undefined
                            ){
                                for(var k=j+1;k<10;k++){
                                    if(
                                        arr[0+pricelist.length*3*k+index*3] != undefined ||
                                        arr[1+pricelist.length*3*k+index*3] != undefined||
                                        arr[2+pricelist.length*3*k+index*3] != undefined
                                    ){
                                        arr[0+pricelist.length*3*j+index*3] = arr[0+pricelist.length*3*k+index*3]; 
                                        arr[1+pricelist.length*3*j+index*3] = arr[1+pricelist.length*3*k+index*3];
                                        arr[2+pricelist.length*3*j+index*3] = arr[2+pricelist.length*3*k+index*3];
                                        break;                                                
                                    }
                                }
                            }
                    }
                    if(modelExist){
                    }
                    else{
                        totalArr.push({
                            model:eachprice.model,
                            list:arr
                        });
                    }
                });
            });
            function custonSort(a, b) {
                if(a.model == b.model){ return 0} return  a.model > b.model ? 1 : -1;
            }
            totalArr.sort(custonSort);
            totalArr.some(function(eachTotalArr){
                TOTAL_PRICE.update(
                    {model:eachTotalArr.model},
                    {
                        model:eachTotalArr.model,
                        ofc_63 : eachTotalArr.list.slice(0,30),
                        ofc_53 : eachTotalArr.list.slice(30,60),
                        ofc_43 : eachTotalArr.list.slice(60,90),
                        ofc_33 : eachTotalArr.list.slice(90,120),
                        ofc_23 : eachTotalArr.list.slice(120,150),
                        cho_63 : eachTotalArr.list.slice(150,180),
                        cho_53 : eachTotalArr.list.slice(180,210),
                        cho_43 : eachTotalArr.list.slice(210,240),
                        cho_33 : eachTotalArr.list.slice(240,270),
                        cho_23 : eachTotalArr.list.slice(270,300)              
                    },
                    {upsert:true},
                    function(err){
                        if(err){
                            console.log("LG_SEOCHO Update error"+err);
                        }
                    }
                );
            });
            callback();
            
    });
    
};
