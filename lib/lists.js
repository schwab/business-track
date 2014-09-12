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
    var content = "<p></p><p></p><table><tr><td class='nav-header'><h4>Date</h4></td><td class='nav-header'><h4>Vendor</h4></td><td class='nav-header'><h4>Sub Account</h4></td><td class='nav-header'><h4>Amount</h4></td><td class='nav-header'>View</td><td class='nav-header'>Edit</td></tr><tbody>";
    rows.forEach(function(item)
    {
        content += "<tr><td>" + item.value.year + "-" + item.value.month + "-" +  item.value.day + "</td><td>";
        content += item.value.vendor + "</td><td>" + item.value.sub_account + "</td><td>$" + item.value.total ;
        content += "</td><td><a href="+ item.value.original_path +">View</a></td><td><a href='../_show/add_expense/" + item.value._id + "'>Edit</a></td></</tr>";});
    content+="</tbody></table><br><a class='btn' href='../_show/add_expense'>Add New</a>"
    log("item_list data : " +rows);
    return {title: 'Expenses', content:content};
};
