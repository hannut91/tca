var mongoose = require('mongoose');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var Alert = mongoose.model('Alert');
var AlertEvent = mongoose.model('AlertEvent');
exports.check = function () {
    User.find()
        .exec(function (err, user) {
            if (!user) {
                console.log("wrong username");
            }
            else {

                var currentDate = new Date();
                user.forEach(function (eachuser) {
                    eachuser.customerlist.forEach(function (eachcustomer) {
                        eachcustomer.alertlist.forEach(function (eachalert) {
                            if (eachalert.occurdate.getFullYear() == currentDate.getFullYear() &&
                                eachalert.occurdate.getMonth() == currentDate.getMonth() &&
                                eachalert.occurdate.getDate() == currentDate.getDate()) {
                                var AlertInfo = new AlertEvent({
                                    customername: eachcustomer.customername,
                                    phonenum: eachcustomer.phonenum,
                                    content: eachalert.content,
                                    occurdate: eachalert.occurdate,
                                    datecount: eachalert.datecount
                                });
                                eachuser.useralert.push(AlertInfo);
                                eachuser.save();
                            }
                        }, this);
                    }, this);
                }, this);
            }
        });
}