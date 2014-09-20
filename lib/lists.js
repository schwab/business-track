/**
 * List functions to be exported from the design doc.
 */
var templates = require('duality/templates');
exports.accounts = function(head,req)
{
    log("account list");
    start({code:200,headers:{'Content-Type':'text/html'}});
    var row,rows=[];
    while(row =getRow())
    {
        rows.push(row);
    }
    log("account(s) : " + rows.length);
    var content = "<table>";
    rows.forEach(function(item){
            log(Object.keys(item));
       content += "<tr><td class='col-md-6' >" + item.key + "</td><td class='col-md-6'><span class='pull-right'> $"  +CurrencyFormatted(  item.value) + "</span></td></tr>";
        }
    );
    content +="</table>";
    return {title:"Accounts",content:content}
};
function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
}
exports.transaction_list= function(head,req){


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
    //var menuHtml = generateMenuHtml(getMenus(rows),"Expenses");
    var content = "<p></p><p></p><table><tr><td class='nav-header'><h4>Date</h4></td><td class='nav-header'><h4>Vendor</h4></td>";
    content += "<td class='nav-header'><h4>Account</h4></td><td class='nav-header'><h4>Sub Account</h4></td>";
    content += "<td class='nav-header'><h4>Amount</h4></td><td class='nav-header'><h4>View</h4></td><td class='nav-header'><h4>Edit</h4></td></tr><tbody>";
    rows.forEach(function(item)
    {

        if(item.value.type=="expense")
        {
            content += "<tr><td>" + item.value.year + "-" + item.value.month + "-" +  item.value.day + "&nbsp;</td>";
            content += "<td>" + item.value.account + "</td><td>" + item.value.vendor + "&nbsp;</td><td>" + item.value.sub_account + "</td><td class='pull-right'>$" + item.value.total+"</td>";
            content += "<td><a href='/" + req.info.db_name +"/_design/business/_rewrite/expense/" + item.value._id + "'>&nbsp;Edit</a></td>";
            content += "<td><a href="+ item.value.original_path +">&nbsp;View Receipt</a></td></</tr>";
            }
    });
    content += "</tbody></table><br><a class='btn' href='/" + req.info.db_name +"/_design/business/_rewrite/expense'>Add New</a>";

    log("item_list data : " +rows);
    return {title: 'Expenses', content:content};
};

function generateMenuHtml(menus,highlighted)
{
    var menuHtml = "";
    menus.forEach(function(item){
        var c = '';
        if(item.value.name == highlighted)
        {
            c='active';
        }
        menuHtml += '<a class=" app-nav-item ' + c + '" href="'+ item.value.link + '">' + item.value.name+ '</a>'
    });

    return menuHtml;
}
function getMenus(rows)
{
    var menus = [];
    rows.forEach(function(item)
    {
        if(item.value.type=="menu")
        {
            menus.push(item);
        }
    });
    return menus;
}