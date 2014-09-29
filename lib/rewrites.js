/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/expense', to: '_show/add_expense'},
    {from: '/expense/*', to: '_show/add_expense/*'},
    {from: '/expense_all',to:'_list/transaction_list/expenses_all'},
     {from: '/income/add', to: '_show/add_sale'},
    {from: '/income/add/*', to: '_show/add_sale/*'},
    {from: '/income',to:'_list/transaction_list/sales_all'},

    {from: '/accounts', to:'_list/accounts/account_sums'},
    {from: '/accounts*', to:'_list/accounts/account_sums*'},
    {from: '/accounts/*', to:'_list/accounts/account_sums/*'},
    {from:'/menus',to:'_view/menus'},
    {from: '/update_expense',to:'_update/update_expense'},
    {from: '/update_sale',to:'_update/update_sale'},
    {from: '*', to: '_show/not_found'}
];
