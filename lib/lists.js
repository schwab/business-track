/**
 * List functions to be exported from the design doc.
 */
var templates = require('duality/templates');

exports.item_list= function(head,req){


    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var row, rows = [];
    while (row = getRow()) {
        rows.push(row);
    }
    log("item_list rows " + rows.length);

    // generate the markup for a list of blog posts
    //var content = templates.render('item_list.html', req, {
    //    rows: rows
    //})
    // ;
    var content = "<table><thead><tr><td>Date</td><td>Vendor</td><td>Sub Account</td><td>Amount</td></tr></thead>";
    rows.forEach(function(item){content += "<tr><td>" + item.value.year + "-" + item.value.month + "-" +  item.value.day + "</td><td>" + item.value.vendor + "</td><td>" + item.value.sub_account + "</td><td>$" + item.value.total +"</td><td><a href="+ item.value.original_path +">View</a></td></</tr>";});
    content+="</table><br><a href='../_show/add_expense'>Add New</a>"
    log("item_list data : " +rows);
    return {title: 'Expenses', content:content};
};
