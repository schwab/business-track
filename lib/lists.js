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
    var content = "<table class='tablesorter'><thead><th>Account</th><th>Amount</th></thead><tbody>";
    rows.forEach(function(item){
            log(Object.keys(item));
       content += "<tr><td class='col-md-6' >" + item.key[1] + ' : ' + item.key[2] + "</td><td class='col-md-6'><span class='pull-right'> $"  +CurrencyFormatted(  item.value) + "</span></td></tr>";
        }
    );
    content +="</tbody></table>";
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
    //http://tablesorter.com/docs/

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var row, rows = [];
    while (row = getRow()) {
        rows.push(row);
    }
    var viewName = req.path[req.path.length-1];
    log("item_list rows " + rows.length +  " view : " + viewName);
    var editRewrite = getEditRewrite(viewName);

    //var menuHtml = generateMenuHtml(getMenus(rows),"Expenses");
    var content = "<p><a class='btn' href='/" + req.info.db_name +"/_design/business/_rewrite/" + editRewrite + "'><i class='icon-edit'></i></a></p>";
    content += "<p></p><table  id='myTable' class='tablesorter'><thead><tr><th class=''>Date</th><th class=''>Vendor/Customer</th>";
    content += "<th class=''>Account</th><th class=''>Sub Account</th>";
    content += "<th class=''>Amount</th><th class=''>View</th><th class=''>Edit</th></tr></thead><tbody>";
    rows.forEach(function(item)
    {

        if(item.value.type=="expense" )
        {
            content += "<tr><td>" + item.value.year + "-" + item.value.month + "-" +  item.value.day + "&nbsp;</td>";
            content += "<td>" + item.value.vendor + "</td><td>" + item.value.account + "&nbsp;</td><td>" + item.value.sub_account + "</td><td class='pull-right'>$" + item.value.total+"</td>";
            content += "<td><a href='/" + req.info.db_name +"/_design/business/_rewrite/" + editRewrite + "/" + item.value._id + "'>&nbsp;Edit</a></td>";
            content += "<td><a href="+ item.value.original_path +">&nbsp;View Receipt</a></td></</tr>";
        }
        if(item.value.type =='sale')
        {
            content += "<tr><td>" + item.value.year + "-" + item.value.month + "-" +  item.value.day + "&nbsp;</td>";
            content += "<td>" + item.value.customer + "</td><td>" + item.value.account + "&nbsp;</td><td>" + item.value.sub_account + "</td><td class='pull-right'>$" + item.value.total+"</td>";
            content += "<td><a href='/" + req.info.db_name +"/_design/business/_rewrite/" + editRewrite + "/" + item.value._id + "'>&nbsp;Edit</a></td>";
            content += "<td><a href="+ item.value.original_path +">&nbsp;View Receipt</a></td></</tr>";

        }
    });
    content += "</tbody></table><br>";

    //log("item_list data : " +rows);
    var title = getPageTitle(viewName);
    return {title: title, content:content};
};
function getPageTitle(view)
{
    switch(view)
    {
        case 'expense_all':
            return "Expense";
        case 'sales_all':
            return "Sales";
        default:
            return "Unknown";
    }

}
function getEditRewrite(view)
{
    log('rewrite view ' + view);
    switch(view)
    {
        case "expenses_all":
            return "expense";
        case "sales_all":
            return "income/add";
        default:
            return "";
    }
}
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