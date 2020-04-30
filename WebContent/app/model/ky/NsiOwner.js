Ext.define('TK.model.ky.NsiOwner', {
    extend: 'Ext.data.Model',

    requires: [
        'TK.Utils'
    ],

    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'nameown', 'adress', 'prim'/*,
        {name:'ownkont', type:'boolean'},
        {name:'ownvag', type:'boolean'},
        {name:'ownauto', type:'boolean'}*/
    ],
    proxy: {
        type: 'ajax',
        url: 'ky/secure/NsiOwner.do',
        idParam:'hid',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        writer: {
            encode: true,
            root: 'jsonRequest',
            expandData: true
        },
        //extraParams: {action: 'list'},
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});