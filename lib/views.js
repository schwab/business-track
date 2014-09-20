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
            emit(doc.year + doc.month + "" + doc.day._id,doc);
        }
        if(doc.type=="menu")
        {
            emit(doc.order, doc);
        }
        if(doc.type=="tagged")
        {
            emit(doc.order,doc);
        }
    }
};
exports.accounts=
{
    map:function(doc)
    {
        if(doc.type=="expense")
        {
            emit([doc.account,doc.sub_account],doc);
        }
        emitPageDetail(doc);
    }

};
exports.menus={
    map:function(doc)
    {
        if(doc.type=="menu")
        {
            emit(doc.name,doc);
        }
    }
};
exports.account_sums={
    map:function(doc)
    {
        if(doc.type =="expense")
        {
            emit([doc.account,doc.sub_account],-doc.total);
        }
        if(doc.type=="sale")
        {
            emit([doc.account,doc.sub_account],doc.total);
        }
    },
    reduce:function(keys,values,rereduce)
    {
        //keys.push("total");
        //values.push(sum(values));
        return sum(values);
    }

}
function emitPageDetail(doc)
{
    if(doc.type=="menu")
    {
        emit(doc.order, doc);
    }
    if(doc.type=="tagged")
    {
        emit(doc.order,doc);
    }
}
