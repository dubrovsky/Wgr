/**
 * Created by Odmin on 07.02.2020.
 */
Ext.define('TK.model.stamp.PrintDataStampBorder', {
    extend: 'Ext.data.Model',

    requires: [],

    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull: true},
        // {name:'hidStamp', type:'int', useNull: false},
        {name:'border', type:'int', useNull: false},
        {name:'rllx', type:'float', useNull: false},
        {name:'rlly', type:'float', useNull: false},
        {name:'rurx', type:'float', useNull: false},
        {name:'rury', type:'float', useNull: false},
        {name:'color', useNull: true},
        {name:'radius', type:'int', useNull: true},
    ]
    // ,
    // belongsTo:[
    //     {model:'TK.model.stamp.PrintDataStamp'}
    // ]
});