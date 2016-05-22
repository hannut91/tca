var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var AlertEvent = new Schema({
    customername: String,
    phonenum: String,
    content: String,
    occurdate : Date,
    datecount : Number,
    userId : Schema.Types.ObjectId,
    customerId : Schema.Types.ObjectId,
});  
    
var AlertInfo = new Schema({
    content: String,
    occurdate : Date,
    datecount : Number,
    customerId : Schema.Types.ObjectId
});

var CustomerInfo = new Schema({
    customername: String,
    phonenum: String,
    newdate: Date,
    device: String,
    company: String,
    account: String,
    userId:Schema.Types.ObjectId,
});

var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    role: Number,
    hashed_password: String,
});

var OrderList = new Schema({
    orderDate: Date,
    orderName: String,
    orderTel: String,
    orderModel:[String],
    orderType:[String],
    orderColor:[String],
    orderNum:[Number],
    orderAddr:String,
    orderId:Schema.Types.ObjectId,
    orderFinDate:Date,
    notiFinDate:Date
});
var SK_PS_Schema = new Schema({
    model:String,
    ofc_new_59 : Number,
    ofc_mnp_59 : Number,
    ofc_chn_59 : Number,
    ofc_new_51 : Number,
    ofc_mnp_51 : Number,
    ofc_chn_51 : Number,
    ofc_new_el : Number,
    ofc_mnp_el : Number,
    ofc_chn_el : Number,
    cho_new_59 : Number,
    cho_mnp_59 : Number,
    cho_chn_59 : Number,
    cho_new_51 : Number,
    cho_mnp_51 : Number,
    cho_chn_51 : Number,
    cho_new_el : Number,
    cho_mnp_el : Number,
    cho_chn_el : Number, 
});

var SK_ACE_Schema = new Schema({
   model:String,
   ofc_new_59 : Number,
   ofc_mnp_59 : Number, 
   ofc_chn_59 : Number,
   ofc_new_51 : Number,
   ofc_mnp_51 : Number, 
   ofc_chn_51 : Number,
   ofc_new_36 : Number,
   ofc_mnp_36 : Number, 
   ofc_chn_36 : Number,
   ofc_new_el : Number,
   ofc_mnp_el : Number, 
   ofc_chn_el : Number,
   cho_new_59 : Number,
   cho_mnp_59 : Number, 
   cho_chn_59 : Number,
   cho_new_51 : Number,
   cho_mnp_51 : Number, 
   cho_chn_51 : Number,
   cho_new_36 : Number,
   cho_mnp_36 : Number, 
   cho_chn_36 : Number,
   cho_new_el : Number,
   cho_mnp_el : Number, 
   cho_chn_el : Number,
});

var KT_MIR_Schema = new Schema({
   model:String,
   ofc_new_61 : Number,
   ofc_mnp_61 : Number, 
   ofc_chn_61 : Number,
   ofc_new_51 : Number,
   ofc_mnp_51 : Number, 
   ofc_chn_51 : Number,
   ofc_new_t34 : Number,
   ofc_mnp_t34 : Number, 
   ofc_chn_t34 : Number,
   ofc_new_28 : Number,
   ofc_mnp_28 : Number, 
   ofc_chn_28 : Number,
   cho_new_61 : Number,
   cho_mnp_61 : Number, 
   cho_chn_61 : Number,
   cho_new_51 : Number,
   cho_mnp_51 : Number, 
   cho_chn_51 : Number,
   cho_new_t34 : Number,
   cho_mnp_t34 : Number, 
   cho_chn_t34 : Number,
   cho_new_28 : Number,
   cho_mnp_28 : Number, 
   cho_chn_28 : Number,
});

var KT_COD_Schema = new Schema({
    model:String,
    ofc_new_61 : Number,
    ofc_mnp_61 : Number, 
    ofc_chn_61 : Number,
    ofc_new_51 : Number,
    ofc_mnp_51 : Number, 
    ofc_chn_51 : Number,
    ofc_new_23 : Number,
    ofc_mnp_23 : Number, 
    ofc_chn_23 : Number,
    ofc_new_t34 : Number,
    ofc_mnp_t34 : Number, 
    ofc_chn_t34 : Number,
    cho_new_61 : Number,
    cho_mnp_61 : Number, 
    cho_chn_61 : Number,
    cho_new_23 : Number,
    cho_mnp_23 : Number, 
    cho_chn_23 : Number,
});

var KT_KWANGJIN_Schema = new Schema({
    model:String,
    ofc_new_61 : Number,
    ofc_mnp_61 : Number, 
    ofc_chn_61 : Number,
    ofc_new_51 : Number,
    ofc_mnp_51 : Number, 
    ofc_chn_51 : Number,
    ofc_new_23 : Number,
    ofc_mnp_23 : Number, 
    ofc_chn_23 : Number,
    ofc_new_t34 : Number,
    ofc_mnp_t34 : Number, 
    ofc_chn_t34 : Number,
    cho_new_61 : Number,
    cho_mnp_61 : Number, 
    cho_chn_61 : Number,
    cho_new_51 : Number,
    cho_mnp_51 : Number, 
    cho_chn_51 : Number,
    cho_new_23 : Number,
    cho_mnp_23 : Number, 
    cho_chn_23 : Number,
    cho_new_t34 : Number,
    cho_mnp_t34 : Number, 
    cho_chn_t34 : Number
});

var KT_SEOCHO_Schema = new Schema({
    model:String,
    ofc_new_61 : Number,
    ofc_mnp_61 : Number, 
    ofc_chn_61 : Number,
    ofc_new_51 : Number,
    ofc_mnp_51 : Number, 
    ofc_chn_51 : Number,
    ofc_new_23 : Number,
    ofc_mnp_23 : Number, 
    ofc_chn_23 : Number,
    cho_new_61 : Number,
    cho_mnp_61 : Number, 
    cho_chn_61 : Number,
    cho_new_51 : Number,
    cho_mnp_51 : Number, 
    cho_chn_51 : Number,
    cho_new_23 : Number,
    cho_mnp_23 : Number, 
    cho_chn_23 : Number,
});
var LG_DREAM_Schema = new Schema({
    model : String,
    ofc_new_59 : Number,
    ofc_mnp_59 : Number, 
    ofc_chn_59 : Number,
    ofc_new_51 : Number,
    ofc_mnp_51 : Number, 
    ofc_chn_51 : Number,
    ofc_new_46 : Number,
    ofc_mnp_46 : Number, 
    ofc_chn_46 : Number,
    ofc_new_29 : Number,
    ofc_mnp_29 : Number, 
    ofc_chn_29 : Number,
    ofc_new_t29 : Number,
    ofc_mnp_t29 : Number, 
    ofc_chn_t29 : Number,
    cho_new_59 : Number,
    cho_mnp_59 : Number, 
    cho_chn_59 : Number,
    cho_new_51 : Number,
    cho_mnp_51 : Number, 
    cho_chn_51 : Number,
    cho_new_46 : Number,
    cho_mnp_46 : Number, 
    cho_chn_46 : Number,
    cho_new_29 : Number,
    cho_mnp_29 : Number, 
    cho_chn_29 : Number,
    cho_new_t29 : Number,
    cho_mnp_t29 : Number, 
    cho_chn_t29 : Number
});
var LG_SUNGBOOK_Schema = new Schema({
    model : String,
    ofc_new_89 : Number,
    ofc_mnp_89 : Number, 
    ofc_chn_89 : Number,
    ofc_new_59 : Number,
    ofc_mnp_59 : Number, 
    ofc_chn_59 : Number,
    ofc_new_46 : Number,
    ofc_mnp_46 : Number, 
    ofc_chn_46 : Number,
    ofc_new_t29 : Number,
    ofc_mnp_t29 : Number, 
    ofc_chn_t29 : Number,
    ofc_new_29 : Number,
    ofc_mnp_29 : Number, 
    ofc_chn_29 : Number,
    cho_new_89 : Number,
    cho_mnp_89 : Number, 
    cho_chn_89 : Number,
    cho_new_59 : Number,
    cho_mnp_59 : Number, 
    cho_chn_59 : Number,
    cho_new_46 : Number,
    cho_mnp_46 : Number, 
    cho_chn_46 : Number,
    cho_new_t29 : Number,
    cho_mnp_t29 : Number, 
    cho_chn_t29 : Number,
    cho_new_29 : Number,
    cho_mnp_29 : Number, 
    cho_chn_29 : Number
});
var LG_KWANGJIN_Schema = new Schema({
    model : String,
    ofc_new_59 : Number,
    ofc_mnp_59 : Number, 
    ofc_chn_59 : Number,
    ofc_new_46 : Number,
    ofc_mnp_46 : Number, 
    ofc_chn_46 : Number,
    ofc_new_29 : Number,
    ofc_mnp_29 : Number, 
    ofc_chn_29 : Number,
    ofc_new_t29 : Number,
    ofc_mnp_t29 : Number, 
    ofc_chn_t29 : Number,
    cho_new_59 : Number,
    cho_mnp_59 : Number, 
    cho_chn_59 : Number,
    cho_new_46 : Number,
    cho_mnp_46 : Number, 
    cho_chn_46 : Number,
    cho_new_29 : Number,
    cho_mnp_29 : Number, 
    cho_chn_29 : Number,
    cho_new_t29 : Number,
    cho_mnp_t29 : Number, 
    cho_chn_t29 : Number
});
var LG_SEOCHO_Schema = new Schema({
    model : String,
    ofc_mnp_68:Number,
    ofc_mnp_59:Number,
    ofc_mnp_50:Number,
    ofc_mnp_29:Number,
    ofc_mnp_t29:Number,
    ofc_new_68:Number,
    ofc_new_59:Number,
    ofc_new_50:Number,
    ofc_new_29:Number,
    ofc_new_t29:Number,
    ofc_chn_68:Number,
    ofc_chn_59:Number,
    ofc_chn_50:Number,
    ofc_chn_29:Number,
    ofc_chn_t29:Number,
    cho_mnp_68:Number,
    cho_mnp_59:Number,
    cho_mnp_50:Number,
    cho_mnp_29:Number,
    cho_mnp_t29:Number,
    cho_new_68:Number,
    cho_new_59:Number,
    cho_new_50:Number,
    cho_new_29:Number,
    cho_new_t29:Number,
    cho_chn_68:Number,
    cho_chn_59:Number,
    cho_chn_50:Number,
    cho_chn_29:Number,
    cho_chn_t29:Number
});
var TOTAL_PRICE_Schema = new Schema({
    model : String,
    ofc_63 : Array,
    ofc_53 : Array,
    ofc_43 : Array,
    ofc_33 : Array,
    ofc_23 : Array,
    cho_63 : Array,
    cho_53 : Array,
    cho_43 : Array,
    cho_33 : Array,
    cho_23 : Array
})
mongoose.model('User', UserSchema);
mongoose.model('Customer', CustomerInfo);
mongoose.model('Alert',AlertInfo);
mongoose.model('AlertEvent',AlertEvent);
mongoose.model('OrderList',OrderList);

mongoose.model('SK_PS',SK_PS_Schema);
mongoose.model('SK_ACE',SK_ACE_Schema);

mongoose.model('KT_MIR',KT_MIR_Schema);
mongoose.model('KT_COD',KT_COD_Schema);
mongoose.model('KT_KWANGJIN',KT_KWANGJIN_Schema);
mongoose.model('KT_SEOCHO',KT_SEOCHO_Schema);

mongoose.model('LG_DREAM',LG_DREAM_Schema);
mongoose.model('LG_SUNGBOOK',LG_SUNGBOOK_Schema);
mongoose.model('LG_KWANGJIN',LG_KWANGJIN_Schema);
mongoose.model('LG_SEOCHO',LG_SEOCHO_Schema);

mongoose.model('TOTAL_PRICE',TOTAL_PRICE_Schema);