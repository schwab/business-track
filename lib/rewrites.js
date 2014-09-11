/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/', to: '_show/add_expense'},
    {from: '/expense', to: '_show/add_expense'},
    {from: '/expense_all',to:'_list/item_list/expenses_all'},
    {from: '*', to: '_show/not_found'}
];
