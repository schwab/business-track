/**
 * Update functions to be exported from the design doc.
 * Implements couchdb update as described at : http://wiki.apache.org/couchdb/Document_Update_Handlers
 */


var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form,
    utils = require('duality/utils');

exports.update_my_form = function (doc, req) {
    var form = new Form({first_name: fields.string(), last_name: fields.string()});
    form.validate(req);

	/**
	 * We do that because we are not using CouchType
	 * CouchType takes care of generating a uuid
	 */
	form.values._id = req.uuid;

     if (form.isValid()) {
            return [form.values, {content: 'Hello ' + form.values.first_name +', '+ form.values.last_name , title: 'Result'}];
        }
     else {
            var content = templates.render('form.html', req, {
                form_title: 'My Form',
                method: 'POST',
                action: '../_update/update_my_form',
                form: form.toHTML(req),
                input: 'Validate'
            });
            return [null, {content: content, title: 'My First Form'}];
        }
};

exports.update_expense = function(doc,req){
    var expense = require('./types').expense;
    var expForm = new Form(expense);
    expForm.validate(req);
    log("update_expense : " + expForm.values._id);
    if(expForm.values._id == null || !expForm.values._rev)
    {
        expForm.values._id = req.uuid;
        log("New record, assigning _id " + expForm.values._id + " _rev : " + expForm.values._rev);
    }
    else
    {

        log("Found _id : " + expForm.values._id + " updating." + " _rev : " + expForm.values._rev);
    }
    if(expForm.isValid()){
        // add the new expense document by returning the validated values.
        var expdb = expForm.values;
        //expdb.ReceiptDate = new Date(expdb.year,expdb.month,expdb.day);
        log("update_expense : Valid update saving...");
        //return[expdb,{content:"Created new expense entry in the amount of : " + expForm.values.total}];
        return [expdb,utils.redirect(req,  "/expense_all")]

        //http://localhost:5989/simplestpossibleform/_design/business/_rewrite/simplestpossibleform/_design/business/_rewrite/update_expense
    }
    else
    {
        log("update_expense : Invalid values detected, create new.")
        var content = templates.render('form.html',req,
            {
                form_title:"Expense Entry",
                method:'POST',
                action :  "update_expense",
                form : expForm.toHTML(req),
                button:'Validate'
            });
        return [null,{content:content, title:''}];
    }
};