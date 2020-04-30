/**
 * Created by Odmin on 10.02.2020.
 */
Ext.define('TK.model.stamp.PrintDataStampText', {
    extend: 'Ext.data.Model',

    requires: [],


    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull: true},
        // {name:'hidStamp', type:'int', useNull: false},
        {name:'rllx', type:'float', useNull: false},
        {name:'rlly', type:'float', useNull: false},
        {name:'rurx', type:'float', useNull: false},
        {name:'rury', type:'float', useNull: false},
        {name:'color', type:'string', useNull: true},
        {name:'fontFamily', type:'string', useNull: false},
        {name:'fontSize', type:'float', useNull: true},
        {name:'leading', type:'float', useNull: true},
        {name:'bold', type:'boolean', useNull: false},
        {name:'italic', type:'boolean', useNull: false},
        {name:'underline', type:'boolean', useNull: false},
        {name:'uppercase', type:'boolean', useNull: false},
        {name:'rotate', type:'int', useNull: false},
        {name:'tabular', type:'boolean', useNull: false},
        {name:'name', type:'string', useNull: false},
        {name:'mask', type:'string', useNull: false},
        {name:'txt', type:'string', useNull: false}
    ]
    // ,
    // belongsTo:[
    //     {model:'TK.model.stamp.PrintDataStamp'}
    // ]
});