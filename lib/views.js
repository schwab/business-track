/**
 * Views to be exported from the design doc.
 */
exports.map_type = {
map: function(doc) {
    if (doc.type == 'person') {
        emit(doc._id, doc);
    }
  }
};

exports.expenses_all = {
    map:function(doc)
    {

        if(doc.type=="expense")
        {
            emit(doc._id,doc);
        }
    }
}