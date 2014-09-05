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