/**
 * Created with PyCharm.
 * User: root
 * Date: 9/17/14
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */
exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
        sum += args[i++];
    }
    return sum;
};