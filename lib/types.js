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
        vendor:fields.string(),
        account:fields.string(),
        sub_account:fields.string(),
        sub_total:fields.number(),
        total:fields.number(),
        tax:fields.number(),
        original_path:fields.url()

    }
});
