/**
 * Show functions to be exported from the design doc.
 * http://guide.couchdb.org/draft/show.html
 */

var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form;


exports.welcome = function (doc, req) {
    return {
        title: 'It worked!',
        content: templates.render('welcome.html', req, {})
    };
};

exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};

exports.my_form = function (doc, req) {
    var person = require('./types').person;

//	var myForm = new Form ({first_name: fields.string(), last_name: fields.string()});
    var myForm = new Form(person);
	return {
	  title : 'My First Form',
	  content: templates.render('form.html', req, {
			form_title : 'My Form',
			method : 'POST',
			action : '../_update/update_my_form',
			form : myForm.toHTML(req),
			button: 'Validate'})
	}
};

exports.add_expense = function(doc,req){
   var expense = require('./types').expense;
    var expForm =  new Form(expense);;
    if(doc !=null)
    {
        expForm =  new Form(expense,doc);
        log('Business Expense : edit doc: ' + doc._id + Object.keys(req));
    //    expForm = expForm.bind(doc);
    }
    else log("Business Expense : show add new");
    return {
        title: "Expense Entry",
        content : templates.render('form.html',req,{
            form_title:"Expense Entry",
            method:'POST',
            action : '../_update/update_expense',
            form : expForm.toHTML(doc),
            button:'Validate'
        })

    }

};
exports.my_form_content = function(doc, req) {
	return {
		title: 'Content of my Form',
		content: templates.render('base.html', req, {content : '<b>First Name</b> : ' +  doc.first_name + '<br/><b>Last Name</b> : ' + doc.last_name}) 
	};
};
