/**
 * Kanso document types to export
 */
var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');

exports.person= new Type('person', {
    fields: {
        first_name:fields.string(),
        last_name:fields.string()
    }

});
exports.expense = new Type('expense', {
    fields : {
        date:fields.createdTime(),
        year:fields.choice({required:true,values:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"]}),
        month:fields.choice({required:true,values:["1","2","3","4","5","6","7","8","9","10","11","12"]}),
        day:fields.choice({required:true,values:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]}),
        vendor:fields.string(),
        account:fields.string(),
        sub_account:fields.string(),
        sub_total:fields.number(),
        total:fields.number(),
        tax:fields.number(),
        original_path:fields.string()

    }
});
exports.sale = new Type('sale', {
    fields : {
        date:fields.createdTime(),
        year:fields.choice({required:true,values:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"]}),
        month:fields.choice({required:true,values:["1","2","3","4","5","6","7","8","9","10","11","12"]}),
        day:fields.choice({required:true,values:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]}),
        customer:fields.string(),
        account:fields.string(),
        sub_account:fields.string(),
        sub_total:fields.number(),
        total:fields.number(),
        tax:fields.number(),
        original_path:fields.string()

    }
});
