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

